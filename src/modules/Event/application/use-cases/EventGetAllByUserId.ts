import { Event } from '../../domain/models/Event';
import { IntEventRepository } from '../../domain/ports/IntEventRepository';
import { IntUserRepository } from '../../../User/domain/ports/IntUserRepository';
import { UserId } from '../../../User/domain/value-objects/UserId';

export class EventGetAllByUserId {
  constructor(
    private repository: IntEventRepository,
    private userRepository: IntUserRepository,
  ) {}

  async run(userId: number): Promise<Event[]> {
    const user = await this.userRepository.getOneById(new UserId(userId));
    if (!user) throw new Error('User not found');

    return this.repository.getAllByUserId(userId);
  }
}
