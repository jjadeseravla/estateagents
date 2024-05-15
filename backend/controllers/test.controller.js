import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn = async (req, res) => {
  // in verifyToken() we pass userId from payload to the req so we can use it here
  console.log(req.userId); // logout and on postman route of should-be-logged-in you are not authenticated
  //but postman login and then do it again and you are and your req.userId is 6643430ce8dbdfbd1a55c23a
  res.status(200).json({ message: 'you are authenticated' });
}

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  console.log('testcontroller token', token); // have token

  if (!token) return res.status(401).json({ message: 'no token, so not authenticated' });

  jwt.verify(token, 'jwtsecretkey', async (err, payload) => {
    if (err) return res.status(403).json({ message: 'token is not valid' });
    if (!payload.isAdmin) {
      // you have a token, so logged in, but you are not an admin
      return res.status(403).json({ message: 'you are not admin, so not authorised' });
    }
  });
  res.status(200).json({ message: 'you are authenticated' });
}