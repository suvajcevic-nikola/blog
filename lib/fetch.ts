const _API_BASE_URL = "https://5ebd9842ec34e900161923e7.mockapi.io";

export type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
export type RInit = {
  method?: AllowedMethods;
  headers?: RequestInit["headers"];
  body?: RequestInit["body"];
};

export const fetchService = (endpoint: string, init?: RInit) => {
  return fetch(`${_API_BASE_URL}/${endpoint}`, init);
};
