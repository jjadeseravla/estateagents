import jwt from 'jsonwebtoken';

 const verifyToken = (req, res, next) => {
   const token = req.cookies.token;
   
   console.log('verify token', token);

  if (!token) return res.status(401).json({ message: 'no token, so not authenticated' });

  jwt.verify(token, 'jwtsecretkey', async (err, payload) => {
    if (err) return res.status(403).json({ message: 'token is not valid' })
      //assign status inside my request
    console.log('--------payload----ddddd')
    req.userId = payload.id;
    console.log('req.userId***************', req.userId);
    // express middleware allows you to intercept any process, make your verifications and then contrinue with process
    // if all ok it should go onto next() and that in test.routes shows it will go onto run shouldBeLoggedIn
    next();
  });
 }
export default verifyToken;