import { Event } from '../../domain/models/Event';
import { IntEventRepository } from '../../domain/ports/IntEventRepository';

export class EventGetAll {
  constructor(private repository: IntEventRepository) {}

  async run(): Promise<Event[]> {
    return this.repository.getAll();
  }
}
