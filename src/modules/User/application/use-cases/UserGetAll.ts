import { User } from '../../domain/models/User';
import { IntUserRepository } from '../../domain/ports/IntUserRepository';

export class UserGetAll {
  constructor(private repository: IntUserRepository) {}

  async run(): Promise<User[]> {
    return this.repository.getAll();
  }
}
