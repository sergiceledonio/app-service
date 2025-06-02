export class EventObservations {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value && this.value.length > 500) {
      throw new Error('EventObservations cannot be longer than 500 characters');
    }
  }
}
