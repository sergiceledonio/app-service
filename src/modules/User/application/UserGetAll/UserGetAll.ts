import { User } from '../../domain/User';
import { IntUserRepository } from '../../domain/IntUserRepository';

export class UserGetAll {
  constructor(private repository: IntUserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.getAll();
  }
}
