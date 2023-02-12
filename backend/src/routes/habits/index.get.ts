export default defineAuthenticatedEventHandler(async (_, userId) => {
  return response(await getAllHabbits(userId));
});
