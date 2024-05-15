// import bcrypt from 'bcrypt.js';
import bcrypt from '../node_modules/bcrypt/bcrypt.js'; // Use relative path
import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, email, password: hashedPassword });
    console.log('userrrrrrrr', user);
    res.status(201).json({message: 'user createdddd'})
  } catch (e) {
    console.log(e, 'didnt workkkk');
    res.status(500).json({ message: 'already a user' });
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username }).lean();


    if (!user) {
      return res.status(404).json({ message: 'user not founddd' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'invalid credentialsss' });
    }

    const age = 1000 * 60 * 60 * 24 * 7; // 1 week

    console.log('---------token usr', user)
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: true,
      },
      'jwtsecretkey',
      { expiresIn: age }
    );

    console.log('authcontroller token', token); //do get token

    const { password: userPassword, ...userInfo } = user;

    // res.setHeader('Set-Cookie', 'test=' + 'myValue').json('success');
    res
      .cookie('token', token, {
        httpOnly: true,
        // secure: true
        maxAge: age,
      })
      .status(200)
      .json(userInfo)
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'logging in didnt work'})
  }
}

export const logout = (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'logout was successful' });
}