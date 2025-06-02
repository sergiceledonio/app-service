import { EventName } from '../value-objects/EventName';
import { EventAddress } from '../value-objects/EventAddress';
import { EventCity } from '../value-objects/EventCity';
import { EventStart } from '../value-objects/EventStart';
import { EventEnd } from '../value-objects/EventEnd';
import { EventDate } from '../value-objects/EventDate';
import { EventObservations } from '../value-objects/EventObservations';
import { EventPrice } from '../value-objects/EventPrice';
import { EventType } from '../value-objects/EventType';
import { EventContact } from '../value-objects/EventContact';
import { EventCreatedAt } from '../value-objects/EventCreatedAt';

export class Event {
  id: number;
  name: EventName;
  address: EventAddress;
  city: EventCity;
  start: EventStart;
  end: EventEnd;
  date: EventDate;
  observations: EventObservations;
  price: EventPrice;
  type: EventType;
  contact: EventContact;
  userId: number;
  createdAt: EventCreatedAt;

  constructor(
    id: number | null,
    name: EventName,
    address: EventAddress,
    city: EventCity,
    start: EventStart,
    end: EventEnd,
    date: EventDate,
    observations: EventObservations,
    price: EventPrice,
    type: EventType,
    contact: EventContact,
    userId: number,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.start = start;
    this.end = end;
    this.date = date;
    this.observations = observations;
    this.price = price;
    this.type = type;
    this.contact = contact;
    this.userId = userId;
  }

  public toPlaneObject() {
    return {
      id: this.id,
      name: this.name.value,
      address: this.address.value,
      city: this.city.value,
      start: this.start.value,
      end: this.end.value,
      date: this.date.value,
      observations: this.observations.value,
      price: this.price.value,
      type: this.type.value,
      contact: this.contact.value,
      userId: this.userId,
    };
  }
}
