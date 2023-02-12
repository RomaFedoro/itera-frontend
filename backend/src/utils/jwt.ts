import jsonwebtoken from 'jsonwebtoken';

export const generateToken = (payload: object) => {
  const {jwt} = useRuntimeConfig();

  return {
    token: jsonwebtoken.sign(payload, jwt.secret, {expiresIn: jwt.expiresIn}) as string,
    expires: jwt.expiresIn as string,
  };
};

export const verifyToken = <T extends object>(token: string) => {
  const {jwt} = useRuntimeConfig();

  try {
    return jsonwebtoken.verify(token, jwt.secret) as T & { iat: number, exp: number }
  } catch (error) {
    return false as false
  }
}
