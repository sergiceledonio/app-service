import { User } from '../../domain/models/User';
import { UserId } from '../../domain/value-objects/UserId';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';
import { IntUserRepository } from '../../domain/ports/IntUserRepository';

export class UserGetOneById {
  constructor(private repository: IntUserRepository) {}

  async run(id: number): Promise<User> {
    const user = await this.repository.getOneById(new UserId(id));

    if (!user) throw new UserNotFoundError('User not found'); // retorna 404

    return user;
  }
}
