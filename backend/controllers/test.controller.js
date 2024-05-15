import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'no token, so not authenticated' });

  jwt.verify(token, 'jwtsecretkey', async (err, payload) => {
    if (err) return res.status(403).json({ message: 'token is not valid' })
  });
  res.status(200).json({ message: 'you are authenticated' });
}

export const shouldBeAdmin = async (req, res) => {
  console.log('ahhh')
}