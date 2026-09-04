import assert from 'node:assert/strict';
import test from 'node:test';
import { Jamin8rApiClient, Jamin8rApiError } from './client.ts';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

test('registerUser sends the backend v1 contract', async () => {
  let seenUrl = '';
  let seenInit: RequestInit | undefined;
  const client = new Jamin8rApiClient({
    baseUrl: 'http://localhost:8080/',
    correlationId: () => '00000000-0000-0000-0000-000000000001',
    fetch: async (input, init) => {
      seenUrl = input.toString();
      seenInit = init;
      return jsonResponse({ id: 'u1', username: 'jay', createdAt: '2026-09-04T00:00:00Z' }, 201);
    },
  });

  const user = await client.registerUser({ username: 'jay' });
  assert.equal(user.username, 'jay');
  assert.equal(seenUrl, 'http://localhost:8080/v1/users');
  assert.equal(seenInit?.method, 'POST');
  const headers = new Headers(seenInit?.headers);
  assert.equal(headers.get('X-Correlation-Id'), '00000000-0000-0000-0000-000000000001');
  assert.equal(seenInit?.body, JSON.stringify({ username: 'jay' }));
});

test('API errors preserve backend error code and field validation', async () => {
  const client = new Jamin8rApiClient({
    baseUrl: 'http://localhost:8080',
    fetch: async () => jsonResponse({
      timestamp: '2026-09-04T00:00:00Z',
      status: 400,
      code: 'validation_failed',
      message: 'Request validation failed',
      fields: { username: 'size must be between 3 and 32' },
    }, 400),
  });

  await assert.rejects(
    () => client.registerUser({ username: 'x' }),
    (error: unknown) => {
      assert.ok(error instanceof Jamin8rApiError);
      assert.equal(error.code, 'validation_failed');
      assert.equal(error.fields.username, 'size must be between 3 and 32');
      return true;
    },
  );
});

test('follow maps to the async follow command endpoint', async () => {
  let seenBody = '';
  const client = new Jamin8rApiClient({
    baseUrl: 'http://localhost:8080',
    fetch: async (_input, init) => {
      seenBody = String(init?.body ?? '');
      return jsonResponse({ created: true }, 202);
    },
  });

  const result = await client.follow({ followerId: 'a', followedId: 'b' });
  assert.equal(result.created, true);
  assert.equal(seenBody, JSON.stringify({ followerId: 'a', followedId: 'b' }));
});
