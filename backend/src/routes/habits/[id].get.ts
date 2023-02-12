export default defineAuthenticatedEventHandler(async (event, userId) => {
  const id = event?.context?.params?.id;

  if (!id)
    throw BadRequestException();

  return response(
    await getHabitById(userId, parseInt(id))
  );
});
