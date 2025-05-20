import { Repository } from 'typeorm';
import { IntUserRepository } from '../domain/IntUserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './UserEntity';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserPhone } from '../domain/UserPhone';
import { UserRole } from '../domain/UserRole';
import { UserCreatedAt } from '../domain/UserCreatedAt';

export class UserPostgresRepository implements IntUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private mapToDomain(user: UserEntity): User {
    return new User(
      user.id,
      new UserName(user.name),
      new UserEmail(user.email),
      new UserPassword(user.password),
      new UserPhone(user.phone),
      new UserRole(user.role),
      new UserCreatedAt(user.createdAt),
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
      email: user.email.value,
      createdAt: user.createdAt.value,
      password: user.password.value,
      phone: user.phone.value,
      role: user.role.value,
    });
  }

  async edit(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, {
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      phone: user.phone.value,
      role: user.role.value,
      createdAt: user.createdAt.value,
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.userRepository.delete(id.value);
  }
}
