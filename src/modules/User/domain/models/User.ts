import { UserCreatedAt } from '../value-objects/UserCreatedAt';
import { UserEmail } from '../value-objects/UserEmail';
import { UserName } from '../value-objects/UserName';
import { UserPassword } from '../value-objects/UserPassword';
import { UserPhone } from '../value-objects/UserPhone';
import { UserRole } from '../value-objects/UserRole';

export class User {
  id: number;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  phone: UserPhone;
  role: UserRole;
  createdAt: UserCreatedAt;

  constructor(
    id: number | null,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    phone: UserPhone,
    role: UserRole,
    createdAt: UserCreatedAt,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.password = password;
    this.phone = phone;
    this.role = role;
  }

  public nameAndEmail() {
    return `${this.name} - ${this.email}`;
  }

  public toPlaneObject() {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
      role: this.role.value,
      createdAt: this.createdAt.value,
    };
  }
}
