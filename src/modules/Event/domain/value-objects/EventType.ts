export class EventType {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const validTypes = ['residencia', 'discoteca', 'evento', 'otro'];
    if (!validTypes.includes(this.value.toLowerCase())) {
      throw new Error(
        'EventType must be one of: residencia, discoteca, evento, otro',
      );
    }
  }
}
