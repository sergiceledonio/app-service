export class EventId {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (isNaN(this.value)) {
      throw new Error('EventId must be a number');
    }
  }
}
