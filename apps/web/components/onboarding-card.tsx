"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Jamin8rApiClient, Jamin8rApiError } from "@jamin8r/api-client";
import type { User } from "@jamin8r/contracts";

export function OnboardingCard() {
  const api = useMemo(
    () => new Jamin8rApiClient({ baseUrl: "/api/backend" }),
    [],
  );
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [created, setCreated] = useState<User | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const user = await api.registerUser({ username: username.trim() });
      await api.upsertProfile(user.id, {
        displayName: displayName.trim(),
        bio: bio.trim() || null,
        location: location.trim() || null,
      });
      setCreated(user);
      setStatus("Your first Jamin8r profile is live in the local backend.");
    } catch (error) {
      if (error instanceof Jamin8rApiError) setStatus(error.message);
      else
        setStatus(
          "Could not reach the Jamin8r backend. Is it running on port 8080?",
        );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className="onboarding-card"
      id="try-it"
      aria-labelledby="onboarding-title"
    >
      <h2 id="onboarding-title">Make it yours.</h2>
      <p>
        Create your Jamin8r profile and start shaping your corner of the
        network.
      </p>
      <form onSubmit={submit}>
        <label>
          Username
          <input
            required
            minLength={3}
            maxLength={32}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="jay"
          />
        </label>
        <label>
          Display name
          <input
            required
            maxLength={80}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Jay"
          />
        </label>
        <label>
          Bio
          <textarea
            maxLength={500}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Music, code, odd corners of the web."
          />
        </label>
        <label>
          Location
          <input
            maxLength={120}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Los Angeles, CA"
          />
        </label>
        <button className="primary-action" disabled={busy} type="submit">
          {busy ? "Creating…" : "Create profile"}
        </button>
      </form>
      {status && (
        <p className={created ? "status success" : "status"} role="status">
          {status}
        </p>
      )}
      {created && <code className="created-id">userId: {created.id}</code>}
    </section>
  );
}
