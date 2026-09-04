import type {
  ApiErrorBody,
  FollowRequest,
  FollowResponse,
  Profile,
  RegisterUserRequest,
  UpsertProfileRequest,
  User,
  UserIdsResponse,
  UserId,
} from '@jamin8r/contracts';

export type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export interface Jamin8rApiClientOptions {
  baseUrl: string;
  fetch?: FetchLike;
  correlationId?: () => string | undefined;
}

export class Jamin8rApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields: Record<string, string>;

  constructor(status: number, code: string, message: string, fields: Record<string, string> = {}) {
    super(message);
    this.name = 'Jamin8rApiError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

export class Jamin8rApiClient {
  readonly #baseUrl: string;
  readonly #fetch: FetchLike;
  readonly #correlationId: (() => string | undefined) | undefined;

  constructor(options: Jamin8rApiClientOptions) {
    this.#baseUrl = options.baseUrl.replace(/\/$/, '');
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#correlationId = options.correlationId;
  }

  registerUser(request: RegisterUserRequest): Promise<User> {
    return this.#request<User>('/v1/users', { method: 'POST', body: request });
  }

  getUser(userId: UserId): Promise<User> {
    return this.#request<User>(`/v1/users/${encodeURIComponent(userId)}`);
  }

  getProfile(userId: UserId): Promise<Profile> {
    return this.#request<Profile>(`/v1/users/${encodeURIComponent(userId)}/profile`);
  }

  upsertProfile(userId: UserId, request: UpsertProfileRequest): Promise<Profile> {
    return this.#request<Profile>(`/v1/users/${encodeURIComponent(userId)}/profile`, {
      method: 'PUT',
      body: request,
    });
  }

  follow(request: FollowRequest): Promise<FollowResponse> {
    return this.#request<FollowResponse>('/v1/follows', { method: 'POST', body: request });
  }

  following(userId: UserId): Promise<UserIdsResponse> {
    return this.#request<UserIdsResponse>(`/v1/users/${encodeURIComponent(userId)}/following`);
  }

  followers(userId: UserId): Promise<UserIdsResponse> {
    return this.#request<UserIdsResponse>(`/v1/users/${encodeURIComponent(userId)}/followers`);
  }

  async #request<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
    const headers = new Headers({ Accept: 'application/json' });
    if (options.body !== undefined) headers.set('Content-Type', 'application/json');
    const correlationId = this.#correlationId?.();
    if (correlationId) headers.set('X-Correlation-Id', correlationId);

    const init: RequestInit = { method: options.method ?? 'GET', headers };
    if (options.body !== undefined) init.body = JSON.stringify(options.body);
    const response = await this.#fetch(`${this.#baseUrl}${path}`, init);

    if (!response.ok) {
      let body: ApiErrorBody | undefined;
      try { body = (await response.json()) as ApiErrorBody; } catch { body = undefined; }
      throw new Jamin8rApiError(
        response.status,
        body?.code ?? 'http_error',
        body?.message ?? `Jamin8r API request failed with HTTP ${response.status}`,
        body?.fields ?? {},
      );
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }
}
