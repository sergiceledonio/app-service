import { EventId } from '../../domain/value-objects/EventId';
import { IntEventRepository } from '../../domain/ports/IntEventRepository';

export class EventDelete {
  constructor(private repository: IntEventRepository) {}

  async run(id: number): Promise<void> {
    return this.repository.delete(new EventId(id));
  }
}
