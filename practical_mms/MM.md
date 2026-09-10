### Question 1 —

```tsx
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  register(@Body() body: any) {
    return {
      id: Date.now(),
      email: body.email,
      age: body.age,
      password: body.password,
    };
  }
}
```

Point out the issues and how you'd fix them.

Write down the issue before fix it

---

## Issues found out:

> No separation of concerns. User controller is handling business logic instead of http alone! => Here we're supposed to create a service to handle the business logic.

> No structure for incoming request body. => we have to create a DTO.

---

Question 2

```tsx
// payments.module.ts
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Module({
  providers: [PaymentsService],
})
export class PaymentsModule {}
```

```tsx
// orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [PaymentsModule],
  providers: [OrdersService],
})
export class OrdersModule {}
```

```tsx
// orders.service.ts
import { Injectable } from '@nestjs/common';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class OrdersService {
  constructor(private paymentsService: PaymentsService) {}
}
```

Point out the issue and how you'd fix it.

---

Question 3

```tsx
import { Controller, Post, Body } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: any) {
    if (body.username === 'admin' && body.password === 'admin123') {
      const token = jwt.sign({ user: body.username }, 'secretkey');
      return { token };
    }
    return { error: 'Invalid credentials' };
  }
}
```

Point out the issues in this code and how you'd fix them.

## Issues found out:

> Business logic is part of the controller
>
> Body is mapped to any
>
> Contains validation logic
>
> returns the error instead of throwing it

## Fixes

> Create auth service
>
> Create body dto
>
> create an auth guard
