import { Event } from '../../domain/models/Event';
import { EventId } from '../../domain/value-objects/EventId';
import { IntEventRepository } from '../../domain/ports/IntEventRepository';
import { EventNotFoundError } from '../../domain/errors/EventNotFoundError';

export class EventGetOneById {
  constructor(private repository: IntEventRepository) {}

  async run(id: number): Promise<Event> {
    const event = await this.repository.getOneById(new EventId(id));
    if (!event) {
      throw new EventNotFoundError();
    }
    return event;
  }
}
