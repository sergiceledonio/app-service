export class EventContact {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('EventContact cannot be empty');
    }
  }
}
