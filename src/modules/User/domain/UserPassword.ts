export class UserPassword {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
  }
}
