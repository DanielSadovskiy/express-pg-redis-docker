import jwt from 'jsonwebtoken';
export const generateToken = (id: string) => {
  const { SECRET = 'secret' } = process.env;
  const token = jwt.sign(
    {
      userId: id,
    },
    SECRET,
    { expiresIn: '7d' },
  );
  return token;
};
