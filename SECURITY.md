# Security

## Reporting

Open a private security advisory in the GitHub repository. Do not include customer
credentials, API keys, private query data, screenshots with personal information,
or proprietary source-page content in a public issue.

## Local Studio defaults

- The server binds to `127.0.0.1` by default.
- Set `GEO_STUDIO_TOKEN` to require `Authorization: Bearer <token>` for `/api/*`.
- Provider keys are read from environment variables and are never written to the
  SQLite database, evidence files, reports, or logs by this application.
- Citation fetching accepts only public HTTP(S) pages and rejects obvious private
  or loopback addresses.

## Publication boundary

- Draft articles require an `approvedBy` value before local or webhook publication.
- Local receipts include SHA-256 content hashes.
- A webhook publisher is an integration seam, not proof that a third-party
  platform accepted the post. The webhook must return its own receipt.
- This repository does not include account credentials, browser sessions, or
  automation for bypassing platform access controls.

## Data boundary

Tenant and workspace isolation must remain enforced when embedding the Studio in
WorkLoom. A PostgreSQL deployment must apply row-level security to every new GEO
table before multiple clients share a database.
