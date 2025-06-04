import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './infrastructure/controllers/event.controller';
import { EventPostgresRepository } from './infrastructure/EventPostgresRepository';
import { EventEntity } from './domain/entities/EventEntity';
import { EventGetAll } from './application/use-cases/EventGetAll';
import { EventGetOneById } from './application/use-cases/EventGetOneById';
import { EventCreate } from './application/use-cases/EventCreate';
import { EventEdit } from './application/use-cases/EventEdit';
import { EventDelete } from './application/use-cases/EventDelete';
import { EventGetAllByUserId } from './application/use-cases/EventGetAllByUserId';
import { UserPostgresRepository } from '../User/infrastructure/UserPostgresRepository';
import { UserEntity } from '../User/domain/entities/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity])],
  controllers: [EventController],
  providers: [
    {
      provide: 'eventRepository',
      useClass: EventPostgresRepository,
    },
    {
      provide: 'userRepository',
      useClass: UserPostgresRepository,
    },
    {
      provide: 'eventGetAll',
      useFactory: (eventRepository: EventPostgresRepository) =>
        new EventGetAll(eventRepository),
      inject: ['eventRepository'],
    },
    {
      provide: 'eventGetOneById',
      useFactory: (eventRepository: EventPostgresRepository) =>
        new EventGetOneById(eventRepository),
      inject: ['eventRepository'],
    },
    {
      provide: 'eventCreate',
      useFactory: (
        eventRepository: EventPostgresRepository,
        userRepository: UserPostgresRepository,
      ) => new EventCreate(eventRepository, userRepository),
      inject: ['eventRepository', 'userRepository'],
    },
    {
      provide: 'eventEdit',
      useFactory: (eventRepository: EventPostgresRepository) =>
        new EventEdit(eventRepository),
      inject: ['eventRepository'],
    },
    {
      provide: 'eventDelete',
      useFactory: (eventRepository: EventPostgresRepository) =>
        new EventDelete(eventRepository),
      inject: ['eventRepository'],
    },
    {
      provide: 'eventGetAllByUserId',
      useFactory: (
        eventRepository: EventPostgresRepository,
        userRepository: UserPostgresRepository,
      ) => new EventGetAllByUserId(eventRepository, userRepository),
      inject: ['eventRepository', 'userRepository'],
    },
  ],
})
export class EventModule {}
