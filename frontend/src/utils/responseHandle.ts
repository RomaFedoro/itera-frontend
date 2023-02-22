const responseHandle = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export default responseHandle;
