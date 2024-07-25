import { AccessTokenGuard, BlacklistGuard } from '@modules/auth/guards';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function Auth() {
  return applyDecorators(UseGuards(AccessTokenGuard, BlacklistGuard));
}
