import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  login(body: UserDto) {
    const token = jwt.sign({ user: body.username }, 'secretkey');

    return { token };
  }
}
