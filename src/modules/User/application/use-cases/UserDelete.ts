import { UserId } from '../../domain/value-objects/UserId';
import { IntUserRepository } from '../../domain/ports/IntUserRepository';

export class UserDelete {
  constructor(private repository: IntUserRepository) {}

  async run(id: number): Promise<void> {
    await this.repository.delete(new UserId(id));
  }
}
