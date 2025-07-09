const BUSINESSMAP_API_URL = process.env.BUSINESSMAP_API_URL ?? "";
const BUSINESSMAP_API_KEY = process.env.BUSINESSMAP_API_KEY ?? "";

class Request {
  private baseUrl: string;

  constructor(baseUrl: string = BUSINESSMAP_API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: string,
    path: string,
    data?: any,
    headers?: HeadersInit
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        APIKEY: BUSINESSMAP_API_KEY,
        ...headers,
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${
          errorData.message || response.statusText
        }`
      );
    }

    return response.json() as Promise<T>;
  }

  public get<T>(path: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>("GET", path, undefined, headers);
  }

  public post<T>(path: string, data: any, headers?: HeadersInit): Promise<T> {
    return this.request<T>("POST", path, data, headers);
  }

  public patch<T>(path: string, data: any, headers?: HeadersInit): Promise<T> {
    return this.request<T>("PATCH", path, data, headers);
  }
  public put<T>(path: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>("PUT", path, undefined, headers);
  }

  public delete<T>(path: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>("DELETE", path, undefined, headers);
  }
}

export default Request;
