import {RegisterUserRequestType, RegisterUserType} from '@/validators/user';

export default defineEventHandler(async (event) => {
  const credentials = await readBody<RegisterUserRequestType>(event);

  const validator = await validate(registerUserRequest, credentials);

  if (!validator.valid)
    throw ValidationException();

  const user = await createUser(credentials as RegisterUserType);

  const token = generateToken({
    id: user.id
  });

  return responseWithMeta(user, token, {
    omit: ['password'],
  });
});
