import {InferType, object, string} from 'yup';

const registerRequest = object({
    name: string().required(),
    email: string().email().required(),
    password: string().min(6).required(),
});

type registerRequestType = InferType<typeof registerRequest>;

export default defineEventHandler(async (event) => {
    const credentials = await readBody<registerRequestType>(event);

    return await validate(registerRequest, credentials);
});