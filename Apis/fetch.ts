const baseURL = process.env.EXPO_PUBLIC_API_URL;

type HTTPMethods = 'GET' | 'POST';

type FetchBase = { endpoint: string; data?: any; method?: HTTPMethods };

export const fetchBase = ({
  endpoint,
  data,
  method = 'GET'
}: FetchBase): Promise<Response> => {
  const headers: HeadersInit = {
    'Content-type': 'application/json'
  };

  const config: RequestInit = {
    method,
    headers
  };

  if (data && Object.keys(data).length > 0) {
    config.body = JSON.stringify(data);
  }

  return fetch(`${baseURL}/${endpoint}`, config);
};
