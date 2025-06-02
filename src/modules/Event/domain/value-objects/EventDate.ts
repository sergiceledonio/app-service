export class EventDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!(this.value instanceof Date) || isNaN(this.value.getTime())) {
      throw new Error('EventDate must be a valid date');
    }

    if (this.value < new Date()) {
      throw new Error('EventDate cannot be in the past');
    }
  }
}
