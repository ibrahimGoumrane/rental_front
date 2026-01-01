/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "./main";


const api = {
    getItem: <T>(url: string, options?: { expectFile?: boolean; addAuthHeaders?: boolean; authMode?: "required" | "optional"}) =>
        fetchData<T>(url, { method: "GET" }, options),
    getAll: <T>(url: string, options?: { expectFile?: boolean; addAuthHeaders?: boolean; authMode?: "required" | "optional"}) =>
        fetchData<T[]>(url, { method: "GET" }, options),
    post: <T>(url: string, data?: any, options?: { expectFile?: boolean, addAuthHeaders?: boolean; authMode?: "required" | "optional"}) =>
        fetchData<T>(url, {
            method: "POST",
            body: data instanceof FormData ? data : JSON.stringify(data),
        }, options),

  put: <T>(url: string, data?: any, options?: { expectFile?: boolean }) =>
    fetchData<T>(
      url,
      {
        method: "PUT",
        body: data instanceof FormData ? data : JSON.stringify(data),
      },
      options
    ),

  patch: <T>(url: string, data?: any, options?: { expectFile?: boolean }) =>
    fetchData<T>(
      url,
      {
        method: "PATCH",
        body: data instanceof FormData ? data : JSON.stringify(data),
      },
      options
    ),

  delete: <T>(url:string, data?: any) => 
    fetchData<T>(url, {
        method: "DELETE",
        body: data ? JSON.stringify(data) : undefined, 
    }),

  download: (url: string, options?: { headers?: HeadersInit }) =>
    fetchData<Blob>(
      url,
      { method: "GET", ...options },
      {
        responseType: "blob",
        expectFile: true,
      }
    ),
};

export { api };
