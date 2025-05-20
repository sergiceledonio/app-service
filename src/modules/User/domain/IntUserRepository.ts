import { User } from './User';
import { UserId } from './UserId';

export interface IntUserRepository {
  create(user: User): Promise<void>;
  getAll(): Promise<User[]>;
  getOneById(id: UserId): Promise<User | null>;
  edit(id: number, user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
