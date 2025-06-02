import { Event } from '../../domain/models/Event';
import { EventName } from '../../domain/value-objects/EventName';
import { EventAddress } from '../../domain/value-objects/EventAddress';
import { EventCity } from '../../domain/value-objects/EventCity';
import { EventStart } from '../../domain/value-objects/EventStart';
import { EventEnd } from '../../domain/value-objects/EventEnd';
import { EventDate } from '../../domain/value-objects/EventDate';
import { EventObservations } from '../../domain/value-objects/EventObservations';
import { EventPrice } from '../../domain/value-objects/EventPrice';
import { EventType } from '../../domain/value-objects/EventType';
import { EventContact } from '../../domain/value-objects/EventContact';
import { IntEventRepository } from '../../domain/ports/IntEventRepository';
import { SaveEventDto } from '../dtos/Validations';

export class EventEdit {
  constructor(private repository: IntEventRepository) {}

  async run(id: number, body: SaveEventDto): Promise<void> {
    const event = new Event(
      id,
      new EventName(body.name),
      new EventAddress(body.address),
      new EventCity(body.city),
      new EventStart(body.start),
      new EventEnd(body.end),
      new EventDate(new Date(body.date)),
      new EventObservations(body.observations),
      new EventPrice(body.price),
      new EventType(body.type),
      new EventContact(body.contact),
      body.userId,
    );

    return this.repository.edit(id, event);
  }
}
