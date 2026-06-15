# Supabase + Drizzle Connection Strings — What We Learned

A reference for the `drizzle-kit push` error and the env var setup that fixed it.

---

## 1. The Original Error

```
Error  Either connection "url" or "host", "database" are required for PostgreSQL database connection
```

Combined with:

```
◇ injected env (0) from .env
```

The `(0)` was the giveaway: drizzle-kit's dotenv loader found **zero variables** in `.env`. So `process.env.DIRECT_URL` (or `DATABASE_URL`) was `undefined`, `dbCredentials.url` ended up `undefined`, and drizzle-kit had nothing to connect with.

**Root causes to check whenever you see `injected env (0)`:**
- Is there an actual `.env` file (not just `.env.example`)?
- Is `.env` in the directory you're **running the command from** (drizzle-kit loads it relative to your CWD, not relative to `drizzle.config.ts`)?
- Does the variable name in `.env` match the one your config actually reads (`DIRECT_URL` vs `DATABASE_URL` etc.)?

---

## 2. `.env` vs `.env.example`

- `.env.example` is a **template** — placeholder text like `direct connection string here`, committed to git, never loaded by your app.
- `.env` is the **real** file — actual secrets, gitignored, loaded by `dotenv.config()`.

`drizzle.config.ts` only reads `.env`. Having a perfect `.env.example` doesn't help drizzle-kit at all — both files need to exist, and `.env` needs real values.

---

## 3. The `drizzle.config.ts` Setup

```ts
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DIRECT_URL!,
    },
});
```

Whatever variable name appears inside `dbCredentials.url` is the **one and only** variable drizzle-kit cares about for migrations. If it's `DIRECT_URL`, that name must exist in `.env` with a real connection string.

---

## 4. Supabase's Three Connection String Types

Click **Connect** (top of the Supabase dashboard) to see all three:

| Type | Port | Host format | Best for |
|---|---|---|---|
| **Direct connection** | 5432 | `db.<project-ref>.supabase.co` | Long-running backends on IPv6-capable infra. IPv6-only unless you pay for the IPv4 add-on. |
| **Session pooler** | 5432 | `aws-x-<region>.pooler.supabase.com` | IPv4-compatible, behaves like a direct connection (full session support). Good for local dev, migrations, IPv4-only networks. |
| **Transaction pooler (Supavisor)** | 6543 | `aws-x-<region>.pooler.supabase.com` | Serverless/edge functions — many short-lived connections, but doesn't support all session-level Postgres features. |

Note the username also changes for pooler connections: `postgres` → `postgres.<project-ref>` (so Supavisor, which is shared across many projects, knows which database to route to).

---

## 5. The `DATABASE_URL` / `DIRECT_URL` Convention

This naming pattern (borrowed from Prisma, commonly reused for Drizzle) is just a **convention**, not a hard requirement:

- `DIRECT_URL` → used by migration tools (`drizzle-kit push`) — needs full Postgres feature support.
- `DATABASE_URL` → used by your running app — typically points at a pooler for handling many concurrent connections.

Drizzle-kit only needs whichever variable your config's `dbCredentials.url` actually references to work. The CLI tool running on *your laptop* doesn't have to use the same connection type as your *deployed app*.

---

## 6. The Real Culprit: No IPv6

After fixing the missing env vars, `drizzle-kit push` still hung indefinitely at "Pulling schema from database..." — no error, just a frozen spinner.

**Diagnosis:**
```
ping -6 google.com
```
Result: `Ping request could not find host google.com.`

This means the machine **cannot resolve/use IPv6 addresses at all** — extremely common, since most home ISPs, mobile networks, and many corporate networks still don't provide proper IPv6 support.

Since Supabase's **direct connection** hostname (`db.<project-ref>.supabase.co`) resolves only to an IPv6 address (without the paid IPv4 add-on), any connection attempt to it from an IPv4-only machine just hangs — no error message, it simply never gets a response.

**Important clarification:** `ping`, `ping -6`, etc. are OS/network-stack level commands. The browser is irrelevant here — switching browsers changes nothing. `google.com` was just a convenient, reliable test target; the result reflects your machine's network capability in general, not anything specific to Google.

---

## 7. The Fix

Swap `DIRECT_URL` from the direct connection string to the **Session pooler** string:

```env
# Before (IPv6-only, hangs on IPv4-only networks)
DIRECT_URL=postgresql://postgres:[password]@db.<project-ref>.supabase.co:5432/postgres

# After (IPv4-compatible, works for migrations)
DIRECT_URL=postgresql://postgres.<project-ref>:[password]@aws-x-<region>.pooler.supabase.com:5432/postgres
```

`DATABASE_URL` (your app's runtime connection) should likewise point at a pooler (session or transaction mode) rather than the raw direct endpoint — since most hosting platforms are IPv4 by default too.

---

## 8. Why Does the Direct Connection Even Exist, Then?

- Many production environments (AWS, GCP, etc.) **do** have solid IPv6 support, where the direct connection is genuinely better: no pooler hop, lower latency, full feature support.
- The direct connection is the "ground truth" endpoint — some specialized tools/workflows need it specifically.
- Supabase sells an **IPv4 add-on** (~$4/mo) for projects that need the direct endpoint reachable over IPv4.
- For local dev on a typical home network, the pooler is simply the practical default — not a downgrade for this purpose.

---

## 9. Mental Model / Cheat Sheet

1. `injected env (0)` → `.env` missing, in the wrong directory, or variable name mismatch with `drizzle.config.ts`.
2. `.env.example` ≠ `.env` — only `.env` is loaded, and it must contain real values.
3. Whatever key `dbCredentials.url` reads from must exist in `.env` with that exact name.
4. If `drizzle-kit push` hangs forever (no error) → suspect IPv6. Test with `ping -6 google.com`.
5. No IPv6 → use Supabase's **Session pooler** string for migrations; it's IPv4-compatible and behaves like a direct connection.
6. Local CLI tools and your deployed app don't need to use the same connection type — pick whatever works for each environment.
