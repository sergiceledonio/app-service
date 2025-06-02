export class EventCreatedAt {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!(this.value instanceof Date) || isNaN(this.value.getTime())) {
      throw new Error('EventCreatedAt must be a valid date');
    }
  }
}
