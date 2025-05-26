import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginDto } from '../../application/dtos/auth/login';
import { RegisterDto } from '../../application/dtos/auth/register';
import { LoginUseCase } from '../../application/use-cases/auth/login';
import { RegisterUseCase } from '../../application/use-cases/auth/register';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('login')
    private readonly LoginUseCase: LoginUseCase,
    @Inject('register')
    private readonly RegisterUseCase: RegisterUseCase,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.LoginUseCase.run(loginDto);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      console.log(registerDto);
      return this.RegisterUseCase.run(registerDto);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
