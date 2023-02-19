import {H3Event} from 'h3';
import {User} from '@prisma/client';

export const defineAuthenticatedEventHandler = <T>(
  handler: (event: H3Event, user: User['id']) => T | Promise<T>
) => {
  return defineEventHandler<T>(async (event) => {
    const token = getBearerToken(event);
    const payload = verifyToken<{ id: User['id'] }>(token ?? '');

    if (!payload)
      throw UnauthorizedException();

    return handler(event, payload.id);
  });
}
