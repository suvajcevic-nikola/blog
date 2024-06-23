const _API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
export type RInit = {
  method?: AllowedMethods;
  headers?: RequestInit["headers"];
  body?: RequestInit["body"];
};

export const fetchService = (endpoint: string, init?: RInit) => {
  return fetch(`${_API_BASE_URL}/${endpoint}`, init);
};
