export const ValidationException = (message: string = 'Validation failed') => createError({
  statusCode: 422,
  message,
});

export const InvalidCredentialsException = () => createError({
  statusCode: 422,
  message: 'Invalid credentials',
});

export const UnauthorizedException = () => createError({
  statusCode: 401,
  message: 'Unauthorized',
});

export const NotFoundException = (message: string = 'Not found') => createError({
  statusCode: 404,
  message,
});

export const BadRequestException = (message: string = 'Bad request') => createError({
  statusCode: 400,
  message,
});
