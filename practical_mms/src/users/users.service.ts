import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  register(body: CreateUserDto) {
    const newUser = { id: Date.now(), ...body };
    this.users.push(newUser);

    // return this.users;
    return newUser;
  }
}
