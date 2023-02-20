import { getCookie } from 'cookies-next';

const getHeaders = ({ includeJWT } = { includeJWT: true }) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (includeJWT) headers.Authorization = String(getCookie('jwt'));

  return headers;
};

export default getHeaders;
