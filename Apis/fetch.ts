const baseURL = process.env.EXPO_PUBLIC_API_URL;

type HTTPMethods = 'GET' | 'POST';

type FetchBase = { endpoint: string; data?: any; method?: HTTPMethods };

export const fetchBase = ({
  endpoint,
  data,
  method = 'GET'
}: FetchBase): Promise<Response> =>
  fetch(`${baseURL}/${endpoint}`, {
    method,
    headers: {
      'Content-type': 'application/json'
    },
    ...(!!data && { body: JSON.stringify(data) })
  });
