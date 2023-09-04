import User from '../models/user.model';
const jwt = require('jsonwebtoken');

export const secretKey = 'secret_key';
export const login = (req, res) => {
  User.findOne({email:req.body.email}).then(user => {
    if(user){
      if (user.password == req.body.password) {
        const token = jwt.sign({ sub: user.id }, secretKey, { expiresIn: '1h' })
        return res.json({ status: 200, token, message: 'User Authentication successfully', user });
      } else {
        return res.json({ status: 400, message: 'Invalid password' });        
      }
    } else {
      return res.json({ status: 400, message: 'User not found!' });              
    }
  }).catch(e => {
      return res.json({ status: 400, message: 'User not found!' });
  })
}

export const register = (req, res) => {
  User.findOne({email:req.body.email}).then(user => {
    if(user){
        return res.json({ status: 201, 'message': 'Already Registered!' });                
      } else {
          const newUser = new User(req.body);
          newUser.save().then(user => res.json({ status: 200, message: 'Successfully registered.', user }))
              .catch(e => res.json({status: 400, message: 'Invalid Request'}))
            }
      }).catch (e => res.json({ status: 400, 'message': 'Invalid Request' }));
}






