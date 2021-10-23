import AppError from '@shared/error/AppError';

type DecodeBasicTokensResponse = {
  username: string;
  password: string;
};

const decodeBasicTokens = (basicToken: string): DecodeBasicTokensResponse => {
  const [authenticationType, token] = basicToken.split(' ');

  if (authenticationType !== 'Basic' || !token) {
    throw new AppError('Tipo de authenticação inválido');
  }

  const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

  const [username, password] = tokenContent.split(':');

  return { username, password };
};

export default decodeBasicTokens;
