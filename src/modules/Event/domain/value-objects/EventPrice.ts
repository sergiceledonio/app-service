export class EventPrice {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (typeof this.value !== 'number' || isNaN(this.value)) {
      throw new Error('EventPrice must be a valid number');
    }

    if (this.value < 0) {
      throw new Error('EventPrice cannot be negative');
    }
  }
}
