/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/error/index";
import { getApiAddress } from "@/lib/settings/index";
import { tokenManager } from "./tokenManager";

// Error response handler
async function handleErrorResponse(response: Response): Promise<never> {
  let errorMessage = "An error occurred while processing the request.";
  let errorBody;

  try {
    errorBody = await response.json();

    if (errorBody.error && errorBody.error.message) {
      // Handle the format: {success: false, code: 401, error: {message: "..."}}
      errorMessage = errorBody.error.message;
    } else if (Array.isArray(errorBody.errors)) {
      // Take the first error message from the array
      errorMessage = errorBody.errors[0];
    } else if (errorBody.errors && typeof errorBody.errors === "object") {
      const errorValues = Object.values(errorBody.errors);
      if (errorValues.length > 0) {
        // Take the first error message from the object
        errorMessage = errorValues[0] as string;
      }
    } else if (errorBody.message) {
      errorMessage = errorBody.message;
    }
  } catch {
    // If JSON parsing fails, use the response text as the error message
    try {
      errorMessage = await response.text();
      errorMessage =
        errorMessage || "An error occurred while processing the request.";
    } catch {
      errorMessage =
        "An error occurred while processing the request and could not parse the response.";
    }
  }

  switch (response.status) {
    case 401:
      throw new UnauthorizedError(errorMessage);
    case 409:
      throw new ConflictError(errorMessage);
    case 400:
      throw new BadRequestError(errorMessage);
    case 403:
      throw new ForbiddenError(errorMessage);
    case 404:
      throw new NotFoundError(errorMessage);
    case 500:
      throw new InternalServerError(errorMessage);
    default:
      throw new Error(
        `Request failed with status: ${response.status} message: ${errorMessage}`
      );
  }
}

const makeRequest = async (
  apiAddress: string,
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const fullUrl = apiAddress + input;
  // Execute the fetch request
  return await fetch(fullUrl, init);
};

export async function fetchData<T>(
  input: RequestInfo,
  init?: RequestInit,
  options?: {
    responseType?: "json" | "text" | "blob" | "stream";
    expectFile?: boolean;
    addAuthHeaders?: boolean;
    authMode?: "required" | "optional";
  }
): Promise<T> {
  const {
    expectFile = false,
    addAuthHeaders = true,
    authMode = "required",
  } = options || {};

  if (!init) init = {};

  // Ensure headers is defined
  if (!init.headers) {
    init.headers = {};
  }

  // Convert headers to a mutable object
  let headers: Record<string, string> = {};
  if (init.headers instanceof Headers) {
    init.headers.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (Array.isArray(init.headers)) {
    init.headers.forEach(([key, value]) => {
      headers[key] = value;
    });
  } else {
    headers = { ...init.headers };
  }

  // Set content type based on body type
  if (init.body instanceof FormData) {
    // Don't set Content-Type for FormData, let the browser set it with boundary
    delete headers["Content-Type"];
  } else if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  // Set accept header
  if (!headers["Accept"]) {
    headers["Accept"] = expectFile ? "*/*" : "application/json";
  }

  // Add authentication headers if requested
  if (addAuthHeaders) {
    if (authMode === "optional") {
      headers = await tokenManager.addAuthHeadersOptional(headers);
    } else if (authMode === "required") {
      headers = await tokenManager.addAuthHeaders(headers);
    }
  }

  // Set credentials
  init.credentials = "include";
  init.headers = headers;

  const apiAddress = getApiAddress();

  try {
    const response = await makeRequest(apiAddress, input, init);

    // Handle token refresh on 401 for authenticated requests
    // But don't treat 401 as auth failure for login/registration requests
    if (response.status === 401 && addAuthHeaders && authMode === "required") {
      // Refresh failed, redirect to login
      tokenManager.logout();
      throw new UnauthorizedError(
        "Authentication failed. Please log in again."
      );
    }

    // Log non-file responses for debugging (only in development)
    const contentType = response.headers.get("Content-Type") || "";
    const isFileResponse =
      expectFile ||
      contentType.includes("application/pdf") ||
      contentType.includes("application/octet-stream") ||
      contentType.includes("image/") ||
      contentType.includes("video/") ||
      contentType.includes("audio/") ||
      (contentType.startsWith("application/") && !contentType.includes("json"));

    if (!isFileResponse && process.env.NODE_ENV !== "production") {
      try {
        const responseClone = response.clone();
        const responseData = await responseClone.json();
        console.log(
          "Request URL:",
          response.url,
          "\nRequest Method:",
          init.method || "GET",
          "\nResponse:",
          responseData,
          "\nStatus Code:",
          response.status
        );
      } catch {
        // Response might not be JSON, ignore logging error
      }
    }

    // Handle successful responses
    if (response.ok) {
      // Handle DELETE with 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      // Handle other response types like blob, text, etc.
      if (options?.responseType === "blob" || options?.expectFile) {
        return response.blob() as Promise<T>;
      }
      if (options?.responseType === "text") {
        return response.text() as Promise<T>;
      }
      if (options?.responseType === "stream") {
        return response as unknown as T;
      }

      // For all other cases, try to parse as JSON, but handle empty body.
      try {
        // Clone the response so we can read its text without consuming the body
        const responseClone = response.clone();
        const responseText = await responseClone.text();

        // If the text is empty, return an empty object.
        if (!responseText) {
          return {} as T;
        }

        // If it's not empty, parse the original response as JSON.
        return response.json() as Promise<T>;
      } catch (jsonError) {
        // This catch block is a safety net in case of weird non-JSON responses.
        console.error(
          "Failed to parse JSON response, but request was successful:",
          jsonError
        );
        throw new Error(
          "Received a successful response, but it was not valid JSON."
        );
      }
    } else {
      // Handle error responses (this part remains the same)
      await handleErrorResponse(response);
    }

    // This should never be reached
    throw new Error("Unexpected response state");
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// Helper function to build query string
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};
