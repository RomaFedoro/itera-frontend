import {LoginUserRequestType, RegisterUserRequestType} from '@/validators/user';
import {hash, compare} from 'bcrypt';
import {User} from '@prisma/client';

const SAULT_ROUNDS = 10;

export const createUser = async (credentials: RegisterUserRequestType) => {
  credentials.password = await hash(credentials.password, SAULT_ROUNDS);

  try {
    return await prisma.user.create({
      data: credentials,
    });
  } catch (_) {
    throw ValidationException('User already exists');
  }
}

export const loginUser = async (credentials: LoginUserRequestType) => {
  const user = await prisma.user.findUnique({
    where: {email: credentials.email},
  });

  if (!user)
    throw InvalidCredentialsException();

  const valid = await compare(credentials.password, user.password);

  if (!valid)
    throw InvalidCredentialsException();

  return user;
}

export const getUserById = async (id: User['id']) => {
  const user = await prisma.user.findUnique({
    where: {id},
  });

  if (!user)
    throw NotFoundException('User not found');

  return user;
}
