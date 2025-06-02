import { UserEmail } from '../value-objects/UserEmail';
import { UserName } from '../value-objects/UserName';
import { UserPassword } from '../value-objects/UserPassword';
import { UserPhone } from '../value-objects/UserPhone';
import { UserRole } from '../value-objects/UserRole';
import { UserArtisticName } from '../value-objects/UserArtisticName';
import { UserLocation } from '../value-objects/UserLocation';
import { UserAvailability } from '../value-objects/UserAvailability';
export class User {
  id: number;
  name: UserName;
  artistic_name: UserArtisticName;
  email: UserEmail;
  password: UserPassword;
  phone: UserPhone;
  role: UserRole;
  location: UserLocation;
  availability?: UserAvailability;

  constructor(
    id: number | null,
    name: UserName,
    artistic_name: UserArtisticName,
    email: UserEmail,
    password: UserPassword,
    phone: UserPhone,
    role: UserRole,
    location: UserLocation,
    availability?: UserAvailability,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = role;
    this.artistic_name = artistic_name;
    this.location = location;
    this.availability = availability;
  }

  public nameAndEmail() {
    return `${this.name} - ${this.email}`;
  }

  public toPlaneObject() {
    return {
      id: this.id,
      name: this.name.value,
      artistic_name: this.artistic_name.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
      role: this.role.value,
      location: this.location.value,
      availability: this.availability?.value ?? null,
    };
  }
}
