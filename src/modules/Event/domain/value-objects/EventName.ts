export class EventName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value || this.value.trim().length < 3) {
      throw new Error('EventName must be at least 3 characters long');
    }
  }
}
