## Practical 1 — Guard an endpoint with a custom API key check

### Context

An internal `/admin/stats` endpoint currently has no protection at all:

```tsx
// admin.controller.ts
@Controller('admin')
export class AdminController {
  @Get('stats')
  getStats() {
    return { uptime: process.uptime(), env: process.env.NODE_ENV };
  }
}
```

The team wants this endpoint reachable only by internal tooling that sends a header `x-api-key` matching a configured secret.

### Challenge

**Write a guard that checks the `x-api-key` header against an expected value (read from config, not hardcoded), and apply it to this route. A missing or wrong key should return 401/403, not a generic error.**

---

<details>
    <summary><b>Solution</b></summary>

Yes. This is a good practical NestJS exercise because it combines three things you have already learned: guards, dependency injection, and configuration.

The clean approach is:

1. Read the expected API key from configuration.
2. Create a custom `CanActivate` guard.
3. Read `x-api-key` from the incoming request.
4. Compare it with the configured key.
5. Throw `UnauthorizedException` if it is missing or invalid.
6. Apply the guard only to `/admin/stats`.

### 1. Configure the API key

Do not hardcode the secret inside the guard.

For example, in `.env`:

```env
ADMIN_API_KEY=your-super-secret-key
```

If you are using `@nestjs/config`, make sure `ConfigModule` is loaded:

```ts
// app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

Because `isGlobal: true`, you can inject `ConfigService` without importing `ConfigModule` into every feature module.

---

### 2. Create the guard

For example:

```bash
nest g guard admin-api-key
```

Then implement it:

```ts
// admin-api-key.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const providedApiKey = request.headers['x-api-key'];

    const expectedApiKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!expectedApiKey) {
      throw new UnauthorizedException('API key is not configured');
    }

    if (providedApiKey !== expectedApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
```

### 3. Apply it to the endpoint

```ts
// admin.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminApiKeyGuard } from './admin-api-key.guard';

@Controller('admin')
export class AdminController {
  @Get('stats')
  @UseGuards(AdminApiKeyGuard)
  getStats() {
    return {
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
    };
  }
}
```

Now the request must contain:

```http
x-api-key: your-super-secret-key
```

For example:

```bash
curl http://localhost:3000/admin/stats \
  -H "x-api-key: your-super-secret-key"
```

Without the header:

```http
401 Unauthorized
```

With the wrong key:

```http
401 Unauthorized
```

With the correct key:

```http
200 OK
```

---

## Why `CanActivate`?

A NestJS guard implements:

```ts
CanActivate;
```

which requires:

```ts
canActivate(context: ExecutionContext): boolean
```

The important mental model is:

```text
Request
   ↓
Guard
   ↓
Is x-api-key valid?
   ↓
 ┌───────────────┐
 │               │
 NO              YES
 │               │
401              Controller
                 ↓
              getStats()
```

The guard decides whether the request is allowed to reach the controller.

---

## Why `ExecutionContext`?

This:

```ts
const request = context.switchToHttp().getRequest<Request>();
```

converts Nest's generic execution context into an HTTP context.

Then you can access:

```ts
request.headers;
```

and therefore:

```ts
request.headers['x-api-key'];
```

This is preferable to directly depending on Express's `req` object in the guard signature because `ExecutionContext` is Nest's abstraction for different execution contexts.

---

## One important detail: `401` vs `403`

For this exercise, `401 Unauthorized` is a very reasonable choice.

Conceptually:

- `401` means the request has not provided valid authentication credentials.
- `403` means the client is authenticated but does not have permission to access the resource.

Since an API key is being used as the credential, a missing or invalid key fits `401` well.

So:

```ts
throw new UnauthorizedException('Invalid API key');
```

is better than allowing a raw error such as:

```ts
throw new Error('Invalid API key');
```

because Nest automatically turns `UnauthorizedException` into a proper HTTP `401` response.

---

## Why inject `ConfigService`?

This part is particularly important for your NestJS understanding:

```ts
constructor(private readonly configService: ConfigService) {}
```

You could technically do:

```ts
const expectedApiKey = process.env.ADMIN_API_KEY;
```

but the exercise specifically asks you to read the value from config.

Using:

```ts
ConfigService;
```

keeps configuration access centralized and makes the guard easier to test.

It also demonstrates dependency injection:

```text
AdminApiKeyGuard
      │
      │ depends on
      ▼
ConfigService
      │
      ▼
Environment configuration
```

Nest creates `AdminApiKeyGuard` and injects `ConfigService` for you because of:

```ts
@Injectable()
```

---

## One improvement I would make

For a real production application, I would avoid returning different information about configuration state to an external caller.

Instead of:

```ts
if (!expectedApiKey) {
  throw new UnauthorizedException('API key is not configured');
}
```

you could fail application startup if the required secret is missing, or use a generic error.

For the practical exercise, however, the above implementation clearly demonstrates the required behavior.

### Interview answer

If your instructor asks you to explain your solution, a strong concise answer would be:

> I created a custom `CanActivate` guard that extracts the `x-api-key` header from the HTTP request and compares it with the expected API key obtained through Nest's `ConfigService`. If the key is missing or incorrect, the guard throws `UnauthorizedException`, which produces a 401 response. If the key is valid, the guard returns `true`, allowing the request to reach the controller. I applied the guard specifically to the `/admin/stats` route using `@UseGuards()`.

That is essentially the complete solution the practical is looking for.

</details>
