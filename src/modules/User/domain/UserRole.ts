export class UserRole {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value !== 'dj' && this.value !== 'client') {
      throw new Error('Invalid role');
    }
  }
}
