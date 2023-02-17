import jsonwebtoken from 'jsonwebtoken';

export const generateToken = (payload: object) => {
  const {jwt} = useRuntimeConfig();

  const expires = parseInt(jwt.expiresIn);

  return {
    token: jsonwebtoken.sign(payload, jwt.secret, {expiresIn: expires}) as string,
    expires: expires,
  };
};

export const verifyToken = <T extends object>(token: string) => {
  const {jwt} = useRuntimeConfig();

  try {
    return jsonwebtoken.verify(token, jwt.secret) as T & { iat: number, exp: number }
  } catch (error) {
    return false as false;
  }
}
