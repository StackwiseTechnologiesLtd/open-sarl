"use client";

import { FormEvent, useState } from "react";
import { mailHref, type Locale } from "@/lib/i18n";

export function NewsletterForm({
  locale,
  label,
  errorLabel,
}: {
  locale: Locale;
  label: string;
  errorLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(errorLabel);
      return;
    }
    setError("");
    window.location.href = mailHref(locale, "newsletter", email);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
      <div className="flex rounded-lg border border-white/10 bg-white/5 p-1">
        <label htmlFor="newsletter-email" className="sr-only">
          {label}
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder={label}
          className="min-w-0 flex-grow border-none bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/30"
        />
        <button type="submit" className="rounded-md bg-primary px-5 py-2 text-sm font-bold text-white">
          OK
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-error-container">{error}</p> : null}
    </form>
  );
}
