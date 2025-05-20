import { UserId } from '../../domain/UserId';
import { IntUserRepository } from '../../domain/IntUserRepository';

export class UserDelete {
  constructor(private repository: IntUserRepository) {}

  async run(id: number): Promise<void> {
    await this.repository.delete(new UserId(id));
  }
}
