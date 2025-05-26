export class UserPhone {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 9) {
      throw new Error('Phone must be at least 9 characters long');
    }
  }
}
