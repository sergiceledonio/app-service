import { IntAuthRepository } from '../../../domain/ports/auth/IntAuthRepository';
import { LoginDto } from '../../dtos/auth/login';

export class LoginUseCase {
  constructor(private authRepository: IntAuthRepository) {}

  async run(loginDto: LoginDto) {
    return this.authRepository.login(loginDto.email, loginDto.password);
  }
}
