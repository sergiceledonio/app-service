import { User } from '../../domain/models/User';
import { UserEmail } from '../../domain/value-objects/UserEmail';
import { UserName } from '../../domain/value-objects/UserName';
import { UserPassword } from '../../domain/value-objects/UserPassword';
import { UserPhone } from '../../domain/value-objects/UserPhone';
import { UserRole } from '../../domain/value-objects/UserRole';
import { IntUserRepository } from '../../domain/ports/IntUserRepository';
import { SaveUserDto } from '../dtos/Validations';
import { UserArtisticName } from '../../domain/value-objects/UserArtisticName';
import { UserLocation } from '../../domain/value-objects/UserLocation';

export class UserCreate {
  constructor(private repository: IntUserRepository) {}

  async run(body: SaveUserDto): Promise<void> {
    const user = new User(
      null,
      new UserName(body.name),
      new UserArtisticName(body.artistic_name),
      new UserEmail(body.email),
      new UserPassword(body.password),
      new UserPhone(body.phone),
      new UserRole(body.role),
      new UserLocation(body.location),
    );

    return this.repository.create(user);
  }
}
