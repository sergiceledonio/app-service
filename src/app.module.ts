import { Module } from '@nestjs/common';
import { UserModule } from './modules/User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './modules/User/domain/entities/UserEntity';
import { AuthModule } from './modules/User/auth.module';
import { EventEntity } from './modules/Event/domain/entities/EventEntity';
import { EventModule } from './modules/Event/event.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserEntity, EventEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    EventModule,
  ],
})
export class AppModule {}
