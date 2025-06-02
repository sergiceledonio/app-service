import { Repository } from 'typeorm';
import { IntUserRepository } from '../domain/ports/IntUserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/entities/UserEntity';
import { User } from '../domain/models/User';
import { UserId } from '../domain/value-objects/UserId';
import { UserName } from '../domain/value-objects/UserName';
import { UserEmail } from '../domain/value-objects/UserEmail';
import { UserPassword } from '../domain/value-objects/UserPassword';
import { UserPhone } from '../domain/value-objects/UserPhone';
import { UserRole } from '../domain/value-objects/UserRole';
import { UserArtisticName } from '../domain/value-objects/UserArtisticName';
import { UserLocation } from '../domain/value-objects/UserLocation';
import { UserAvailability } from '../domain/value-objects/UserAvailability';

export class UserPostgresRepository implements IntUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private mapToDomain(user: UserEntity): User {
    return new User(
      user.id,
      new UserName(user.name),
      new UserArtisticName(user.artistic_name),
      new UserEmail(user.email),
      new UserPassword(user.password),
      new UserPhone(user.phone),
      new UserRole(user.role),
      new UserLocation(user.location),
      new UserAvailability(user.availability),
    );
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.mapToDomain(user));
  }

  async getOneById(id: UserId): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id.value } });

    if (!user) {
      return null;
    }
    return this.mapToDomain(user);
  }

  async create(user: User): Promise<void> {
    await this.userRepository.save({
      name: user.name.value,
      artistic_name: user.artistic_name.value,
      email: user.email.value,
      password: user.password.value,
      phone: user.phone.value,
      role: user.role.value,
      location: user.location.value,
      availability: user.availability.value,
    });
  }

  async edit(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, {
      name: user.name.value,
      artistic_name: user.artistic_name.value,
      email: user.email.value,
      password: user.password.value,
      phone: user.phone.value,
      role: user.role.value,
      location: user.location.value,
      availability: user.availability.value,
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.userRepository.delete(id.value);
  }
}
