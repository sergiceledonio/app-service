import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/modules/User/domain/entities/UserEntity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ type: 'time' })
  start: string;

  @Column({ type: 'time' })
  end: string;

  @Column()
  date: Date;

  @Column()
  observations: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  contact: string;

  @ManyToOne(() => UserEntity, (user) => user.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // Nombre de la columna en la DB
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
