"use client";

import { FormEvent, useState } from "react";
import { newsletterMailto } from "@/lib/site";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Indiquez une adresse e-mail valide.");
      return;
    }
    setError("");
    window.location.href = newsletterMailto(email);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
      <div className="flex rounded-lg border border-white/10 bg-white/5 p-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Adresse e-mail pour la newsletter
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="S'abonner à la newsletter"
          className="min-w-0 flex-grow border-none bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/30"
        />
        <button type="submit" className="rounded-md bg-primary px-6 py-2 text-sm font-bold text-white">
          OK
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-error-container">{error}</p> : null}
    </form>
  );
}
