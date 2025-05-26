import { User } from '../models/User';
import { UserId } from '../value-objects/UserId';

export interface IntUserRepository {
  create(user: User): Promise<void>;
  getAll(): Promise<User[]>;
  getOneById(id: UserId): Promise<User | null>;
  edit(id: number, user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
