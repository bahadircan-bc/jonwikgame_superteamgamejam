import { Type } from '@fastify/type-provider-typebox';

const TFetchUserPathParams = Type.Object({
  referenceId: Type.String(),
});

const TFetchUserResponse = Type.Object({
  referenceId: Type.String(),
  email: Type.String({ format: 'email' }),
});

const TRegisterUserBodyParams = Type.Object({
  referenceId: Type.String(),
  email: Type.String({ format: 'email' }),
  externalWalletAddress: Type.Optional(Type.String()),
});

export { TFetchUserPathParams, TFetchUserResponse, TRegisterUserBodyParams };
