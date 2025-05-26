export class UserId {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (isNaN(this.value)) {
      throw new Error('UserId must be a number');
    }
  }
}
