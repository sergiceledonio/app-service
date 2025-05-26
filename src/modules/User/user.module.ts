import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserPostgresRepository } from './infrastructure/UserPostgresRepository';
import { UserEntity } from './domain/entities/UserEntity';
import { UserGetAll } from './application/use-cases/UserGetAll';
import { UserGetOneById } from './application/use-cases/UserGetOneById';
import { UserCreate } from './application/use-cases/UserCreate';
import { UserEdit } from './application/use-cases/UserEdit';
import { UserDelete } from './application/use-cases/UserDelete';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'userRepository',
      useClass: UserPostgresRepository,
    },
    {
      provide: 'userGetAll',
      useFactory: (userRepository: UserPostgresRepository) =>
        new UserGetAll(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userGetOneById',
      useFactory: (userRepository: UserPostgresRepository) =>
        new UserGetOneById(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userCreate',
      useFactory: (userRepository: UserPostgresRepository) =>
        new UserCreate(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userEdit',
      useFactory: (userRepository: UserPostgresRepository) =>
        new UserEdit(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userDelete',
      useFactory: (userRepository: UserPostgresRepository) =>
        new UserDelete(userRepository),
      inject: ['userRepository'],
    },
  ],
})
export class UserModule {}
