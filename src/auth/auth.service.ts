import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate, Role } from './interfaces/user.interfaces';

@Injectable()
export class AuthService {
  users = [
    {
      id: faker.datatype.uuid(),
      userName: 'admin',
      password: 'admin',
      role: Role.Admin,
    },
    {
      id: faker.datatype.uuid(),
      userName: 'user',
      password: 'user',
      role: Role.User,
    },
  ];

  authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
    const user = this.users.find(
      (u) =>
        u.userName === authenticateDto.userName &&
        u.password === authenticateDto.password,
    );

    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, 'secrete');

    return { token, user };
  }
}
