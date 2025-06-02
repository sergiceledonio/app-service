import { Injectable } from '@nestjs/common';
import { IntAuthRepository } from '../domain/ports/auth/IntAuthRepository';
import { RegisterDto } from '../application/dtos/auth/register';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/entities/UserEntity';

@Injectable()
export class AuthPostgresRepository implements IntAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(email: string, password: string) {
    return this.userRepository.findOne({ where: { email, password } });
  }

  async register(data: RegisterDto) {
    const userExists = !!(await this.userRepository.findOne({
      where: { email: data.email },
    }));

    if (userExists) {
      return null;
    }

    return await this.userRepository.save(data);
  }
}
