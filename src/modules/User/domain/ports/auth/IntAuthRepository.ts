import { RegisterDto } from '../../../application/dtos/auth/register';

export interface IntAuthRepository {
  login(email: string, password: string): Promise<any>;
  register(userData: RegisterDto): Promise<any>;
}
