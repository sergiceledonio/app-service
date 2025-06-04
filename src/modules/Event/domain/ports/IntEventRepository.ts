import { Event } from '../models/Event';
import { EventId } from '../value-objects/EventId';

export interface IntEventRepository {
  create(event: Event): Promise<void>;
  getAll(): Promise<Event[]>;
  getAllByUserId(userId: number): Promise<Event[]>;
  getOneById(id: EventId): Promise<Event | null>;
  edit(id: number, event: Event): Promise<void>;
  delete(id: EventId): Promise<void>;
}
