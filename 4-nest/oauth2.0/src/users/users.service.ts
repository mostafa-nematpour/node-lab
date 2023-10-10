import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'user1',
      password: 'pass1',
      tokens: ['token1', 'token2'],
    },
    {
      userId: 2,
      username: 'user2',
      password: 'pass2',
      tokens: ['token3', 'token4'],
    },
  ];

  async addRefreshToken(userId: number, token): Promise<void> {
    const user = this.users.find((user) => user.userId === userId);
    user.tokens.push(token);
  }

  async findOneByToken(token: string): Promise<User | undefined> {
    for (const user of this.users) {
      if (user.tokens.includes(token)) {
        return user;
      }
    }
    // Return null if the user with the specified token is not found.
    return undefined;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
