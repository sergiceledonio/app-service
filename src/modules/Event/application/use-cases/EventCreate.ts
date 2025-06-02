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
import { IntUserRepository } from '../../../User/domain/ports/IntUserRepository';
import { UserId } from '../../../User/domain/value-objects/UserId';

export class EventCreate {
  constructor(
    private repository: IntEventRepository,
    private userRepository: IntUserRepository,
  ) {}

  async run(body: SaveEventDto): Promise<void> {
    const user = await this.userRepository.getOneById(new UserId(body.userId));
    if (!user) throw new Error('User not found');

    const event = new Event(
      null,
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
      user.id,
    );

    return this.repository.create(event);
  }
}
