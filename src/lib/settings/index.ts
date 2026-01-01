export const settings = {
  FILE_ADDRESS:
    import.meta.env.VITE_DEV_MODE === "true"
      ? import.meta.env.VITE_DEV_SERVER_FILE_ADDRESS
      : import.meta.env.VITE_PROD_SERVER_FILE_ADDRESS,
  API_ADDRESS:
    import.meta.env.VITE_DEV_MODE === "true"
      ? import.meta.env.VITE_DEV_SERVER_API_ADDRESS
      : import.meta.env.VITE_PROD_SERVER_API_ADDRESS,
  WS_ADDRESS:
    import.meta.env.VITE_DEV_MODE === "true"
      ? import.meta.env.VITE_DEV_SERVER_WS_ADDRESS
      : import.meta.env.VITE_PROD_SERVER_WS_ADDRESS,
};

// Provide fallback values if environment variables are not set
export const getApiAddress = () => {
  if (settings.API_ADDRESS) {
    return settings.API_ADDRESS;
  }
  // Fallback to localhost if no environment variable is set
  return "http://localhost:8080/api";
};

export const getWsAddress = () => {
  if (settings.WS_ADDRESS) {
    return settings.WS_ADDRESS;
  }
  // Fallback to localhost WebSocket if no environment variable is set
  return "ws://localhost:8005/ws";
};
if (import.meta.env.DEV) {
  console.log("Configuration chargée:", settings);
}

export const getGithubClientInformation = () => {
  const clientId: string = import.meta.env.VITE_GITHUB_CLIENT_ID || "";
  return { clientId };
};
