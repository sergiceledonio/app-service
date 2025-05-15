import { Repository } from 'typeorm';
import { IntUserRepository } from '../domain/IntUserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './UserEntity';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UserCreatedAt } from '../domain/UserCreatedAt';
import { UserNotFoundError } from '../domain/UserNotFoundError';

export class UserRepository implements IntUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private mapToDomain(user: UserEntity): User {
    return new User(
      new UserId(user.id),
      new UserName(user.name),
      new UserEmail(user.email),
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
      throw new UserNotFoundError('El usuario no existe');
    }
    return this.mapToDomain(user);
  }

  async create(user: User): Promise<void> {
    await this.userRepository.save({
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.value,
    });
  }

  async edit(user: User): Promise<void> {
    await this.userRepository.update(user.id.value, {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.value,
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.userRepository.delete(id.value);
  }
}
