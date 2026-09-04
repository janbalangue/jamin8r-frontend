# Backend API Integration

The shared client mirrors the current Jamin8r backend v0.1 contract.

| Client method | HTTP operation |
| --- | --- |
| `registerUser` | `POST /v1/users` |
| `getUser` | `GET /v1/users/{userId}` |
| `getProfile` | `GET /v1/users/{userId}/profile` |
| `upsertProfile` | `PUT /v1/users/{userId}/profile` |
| `follow` | `POST /v1/follows` |
| `following` | `GET /v1/users/{userId}/following` |
| `followers` | `GET /v1/users/{userId}/followers` |

`Jamin8rApiError` preserves the backend's `status`, `code`, `message`, and validation `fields` object.

The client does not invent authentication behavior. Authentication/authorization is not present in the backend v0.1 contract yet, so the frontend does not pretend that a logged-in identity exists.

Likewise, the taste compatibility/recommendation presentation is demo UI only. Do not wire it to synthetic endpoints; add contracts here only when the backend ships them.
