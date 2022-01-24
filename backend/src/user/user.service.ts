import { Prisma } from '@prisma/client';
import { UserRepository } from './user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with provided id not found`);
    }
    return user;
  }
  async emailUserExists(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    return Boolean(user);
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with provided email does not exist`);
    }
    return user;
  }
  createUser(details: Prisma.UserCreateInput) {
    return this.userRepository.createUser(details);
  }
}
