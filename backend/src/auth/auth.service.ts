import { Role } from './../user/models/user.model';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { UserService } from './../user/user.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { LoginInput } from './dto/inputs/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async signUp(signupDetails: SignUpInput) {
    const { email } = signupDetails;
    const userExists = await this.userService.emailUserExists(email);
    if (userExists) {
      throw new BadRequestException(`User with provided email already exists`);
    }
    signupDetails.password = await this.hashPassword(signupDetails.password);
    const user = await this.userService.createUser({
      ...signupDetails,
    });
    return this.generateTokens({
      userId: user.id,
    });
  }
  async login(loginDetails: LoginInput) {
    const { email, password } = loginDetails;
    const user = await this.userService.getUserByEmail(email);
    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException(`Invalid password`);
    }
    return this.generateTokens({
      userId: user.id,
    });
  }
  getUserFromToken(token: string) {
    const id = this.jwtService.decode(token)['userId'];
    return this.userService.getUserById(id);
  }

  validateUser(userId: number) {
    return this.userService.getUserById(userId);
  }
  private hashPassword(password: string) {
    return hash(password, 10);
  }
  private validatePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }
  private generateAccessToken(payload: { userId: number }) {
    return this.jwtService.sign(payload);
  }
  private generateRefreshToken(payload: { userId: number }) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
  async generateTokens(payload: { userId: number }) {
    await this.userService.updateLastActive(payload.userId);
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return this.generateTokens({ userId });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
