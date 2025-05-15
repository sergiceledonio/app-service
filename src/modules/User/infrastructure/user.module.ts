import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './UserRepository';
import { UserEntity } from './UserEntity';
import { UserGetAll } from '../application/UserGetAll/UserGetAll';
import { UserGetOneById } from '../application/UserGetOneById/UserGetOneById';
import { UserCreate } from '../application/UserCreate/UserCreate';
import { UserEdit } from '../application/UserEdit/UserEdit';
import { UserDelete } from '../application/UserDelete/UserDelete';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
    {
      provide: 'userGetAll',
      useFactory: (userRepository: UserRepository) =>
        new UserGetAll(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userGetOneById',
      useFactory: (userRepository: UserRepository) =>
        new UserGetOneById(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userCreate',
      useFactory: (userRepository: UserRepository) =>
        new UserCreate(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userUpdate',
      useFactory: (userRepository: UserRepository) =>
        new UserEdit(userRepository),
      inject: ['userRepository'],
    },
    {
      provide: 'userDelete',
      useFactory: (userRepository: UserRepository) =>
        new UserDelete(userRepository),
      inject: ['userRepository'],
    },
  ],
})
export class UserModule {}
