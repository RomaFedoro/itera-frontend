export default defineAuthenticatedEventHandler(async (_, userId) => {
  return response(await getUserById(userId), {
    omit: ['password'],
  });
});
