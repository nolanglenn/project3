const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  userProfile: async (args, req) => {
    console.log(args);

    console.log('This is ID#2: ', req.headers.user);
    try {
      const user = await User.find({ _id: req.headers.user });
      console.log({ ...user });

      return user[0];
    } catch (err) {
      console.log(err);

      throw err;
    }
  },
  updateUser: async (args, req) => {
    console.log('THese are the variable: ', { ...req.body.variables });

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.headers.user },
        req.body.variables,
        { upsert: true, new: true }
      );
      return user;
    } catch (err) {
      console.log(err);

      throw err;
    }
  }
};
