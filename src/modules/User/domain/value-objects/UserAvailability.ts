export class UserAvailability {
  value: {
    days: number[];
    month: number;
    year: number;
  };

  constructor(value: { days: number[]; month: number; year: number }) {
    if (value) {
      this.ensureIsValid();
      this.value = value;
    } else {
      this.value = { days: [], month: 0, year: 0 };
    }
  }

  private ensureIsValid() {
    if (!Array.isArray(this.value.days)) {
      throw new Error('Days must be an array of numbers');
    }

    if (
      typeof this.value.month !== 'number' ||
      this.value.month < 1 ||
      this.value.month > 12
    ) {
      throw new Error('Month must be a number between 1 and 12');
    }

    if (typeof this.value.year !== 'number' || this.value.year < 2024) {
      throw new Error('Year must be a valid year starting from 2024');
    }

    if (this.value.days.some((day) => day < 1 || day > 31)) {
      throw new Error('Days must be numbers between 1 and 31');
    }
  }
}
