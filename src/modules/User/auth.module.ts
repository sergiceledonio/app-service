import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthPostgresRepository } from './infrastructure/AuthPostgresRepository';
import { UserEntity } from './domain/entities/UserEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUseCase } from './application/use-cases/auth/login';
import { RegisterUseCase } from './application/use-cases/auth/register';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    {
      provide: 'authRepository',
      useClass: AuthPostgresRepository,
    },
    {
      provide: 'login',
      useFactory: (authRepository: AuthPostgresRepository) =>
        new LoginUseCase(authRepository),
      inject: ['authRepository'],
    },
    {
      provide: 'register',
      useFactory: (authRepository: AuthPostgresRepository) =>
        new RegisterUseCase(authRepository),
      inject: ['authRepository'],
    },
  ],
})
export class AuthModule {}
