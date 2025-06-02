export class EventType {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const validTypes = ['wedding', 'birthday', 'corporate', 'other'];
    if (!validTypes.includes(this.value.toLowerCase())) {
      throw new Error(
        'EventType must be one of: wedding, birthday, corporate, other',
      );
    }
  }
}
