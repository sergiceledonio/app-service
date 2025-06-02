import { Repository } from 'typeorm';
import { IntEventRepository } from '../domain/ports/IntEventRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../domain/entities/EventEntity';
import { Event } from '../domain/models/Event';
import { EventId } from '../domain/value-objects/EventId';
import { EventName } from '../domain/value-objects/EventName';
import { EventAddress } from '../domain/value-objects/EventAddress';
import { EventCity } from '../domain/value-objects/EventCity';
import { EventStart } from '../domain/value-objects/EventStart';
import { EventEnd } from '../domain/value-objects/EventEnd';
import { EventDate } from '../domain/value-objects/EventDate';
import { EventObservations } from '../domain/value-objects/EventObservations';
import { EventPrice } from '../domain/value-objects/EventPrice';
import { EventType } from '../domain/value-objects/EventType';
import { EventContact } from '../domain/value-objects/EventContact';

export class EventPostgresRepository implements IntEventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  private mapToDomain(event: EventEntity): Event {
    return new Event(
      event.id,
      new EventName(event.name),
      new EventAddress(event.address),
      new EventCity(event.city),
      new EventStart(event.start),
      new EventEnd(event.end),
      new EventDate(event.date),
      new EventObservations(event.observations),
      new EventPrice(event.price),
      new EventType(event.type),
      new EventContact(event.contact),
      event.user.id,
    );
  }

  async create(event: Event): Promise<void> {
    await this.eventRepository.save({
      name: event.name.value,
      address: event.address.value,
      city: event.city.value,
      start: event.start.value,
      end: event.end.value,
      date: event.date.value,
      observations: event.observations.value,
      price: event.price.value,
      type: event.type.value,
      contact: event.contact.value,
      user: { id: event.userId },
    });
  }

  async getAll(): Promise<Event[]> {
    const events = await this.eventRepository.find({
      relations: ['user'],
    });
    return events.map((event) => this.mapToDomain(event));
  }

  async getOneById(id: EventId): Promise<Event | null> {
    const event = await this.eventRepository.findOne({
      where: { id: id.value },
      relations: ['user'],
    });
    if (!event) {
      return null;
    }
    return this.mapToDomain(event);
  }

  async edit(id: number, event: Event): Promise<void> {
    await this.eventRepository.update(id, {
      name: event.name.value,
      address: event.address.value,
      city: event.city.value,
      start: event.start.value,
      end: event.end.value,
      date: event.date.value,
      observations: event.observations.value,
      price: event.price.value,
      type: event.type.value,
      contact: event.contact.value,
      user: { id: event.userId },
    });
  }

  async delete(id: EventId): Promise<void> {
    await this.eventRepository.delete(id.value);
  }
}
