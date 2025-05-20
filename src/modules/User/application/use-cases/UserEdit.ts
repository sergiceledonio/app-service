import { User } from '../../domain/User';
import { UserCreatedAt } from '../../domain/UserCreatedAt';
import { UserEmail } from '../../domain/UserEmail';
import { UserName } from '../../domain/UserName';
import { IntUserRepository } from '../../domain/IntUserRepository';
import { UserPassword } from '../../domain/UserPassword';
import { UserPhone } from '../../domain/UserPhone';
import { UserRole } from '../../domain/UserRole';
import { SaveUserDto } from '../dtos/Validations';

export class UserEdit {
  constructor(private repository: IntUserRepository) {}

  async run(id: number, body: SaveUserDto): Promise<void> {
    const user = new User(
      id,
      new UserName(body.name),
      new UserEmail(body.email),
      new UserPassword(body.password),
      new UserPhone(body.phone),
      new UserRole(body.role),
      new UserCreatedAt(new Date()),
    );

    return this.repository.edit(id, user);
  }
}
