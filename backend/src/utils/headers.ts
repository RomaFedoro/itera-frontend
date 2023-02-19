import {H3Event} from 'h3';

export const getBearerToken = (event: H3Event) => {
  const authorization = getRequestHeader(event, 'Authorization');

  if (!authorization)
    return null;

  return authorization?.split(' ')[1] ?? null;
}
