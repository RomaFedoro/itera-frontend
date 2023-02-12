import {LoginUserRequestType, LoginUserType} from '@/validators/user';

export default defineEventHandler(async (event) => {
  const credentials = await readBody<LoginUserRequestType>(event);

  const validator = await validate(loginUserRequest, credentials);

  if (!validator.valid)
    throw ValidationException();

  const user = await loginUser(credentials as LoginUserType);

  const token = generateToken({
    id: user.id,
  });

  return responseWithMeta(user, token, {
    omit: ['password'],
  });
});
