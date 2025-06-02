import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { EventEntity } from 'src/modules/Event/domain/entities/EventEntity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistic_name?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  location?: string;

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @Column('jsonb', { nullable: true })
  availability?: {
    days: number[];
    month: number;
    year: number;
  };

  @CreateDateColumn()
  createdAt: Date;
}
