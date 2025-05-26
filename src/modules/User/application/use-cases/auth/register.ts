import { IntAuthRepository } from '../../../domain/ports/auth/IntAuthRepository';
import { RegisterDto } from '../../dtos/auth/register';

export class RegisterUseCase {
  constructor(private authRepository: IntAuthRepository) {}

  async run(dto: RegisterDto) {
    return this.authRepository.register(dto);
  }
}
