import { User } from '../../domain/models/User';
import { UserEmail } from '../../domain/value-objects/UserEmail';
import { UserName } from '../../domain/value-objects/UserName';
import { IntUserRepository } from '../../domain/ports/IntUserRepository';
import { UserPassword } from '../../domain/value-objects/UserPassword';
import { UserPhone } from '../../domain/value-objects/UserPhone';
import { UserRole } from '../../domain/value-objects/UserRole';
import { SaveUserDto } from '../dtos/Validations';
import { UserLocation } from '../../domain/value-objects/UserLocation';
import { UserAvailability } from '../../domain/value-objects/UserAvailability';
import { UserArtisticName } from '../../domain/value-objects/UserArtisticName';
export class UserEdit {
  constructor(private repository: IntUserRepository) {}

  async run(id: number, body: SaveUserDto): Promise<void> {
    const user = new User(
      id,
      new UserName(body.name),
      new UserArtisticName(body.artistic_name),
      new UserEmail(body.email),
      new UserPassword(body.password),
      new UserPhone(body.phone),
      new UserRole(body.role),
      new UserLocation(body.location),
      new UserAvailability(body.availability),
    );

    return this.repository.edit(id, user);
  }
}
