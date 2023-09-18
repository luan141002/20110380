const User = require('../Models/User');

const checkIdentityNumber = require('../Utils/helper');
class userController {
    // [GET] /users/listUsers
    async getUsers(req, res, next) {
        try {
            // the mongoDB library available function
            const listUser = await User.find();
            res.status(200).json(listUser);
        } catch (err) {
            next(err);
        }
    }
    // [GET] /users/:id
    async getUser(req, res, next) {
        // get the infor from the path with the get method request
        try {
            // the mongoDB library available function
            const user = await User.findOne({
                IdentityCard: req.params.id,
                isActive: true,
            });
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
    // [GET] /users/:id/active
    async approveUser(req, res, next) {
        // get the infor from the path with the get method request
        try {
            // the mongoDB library available function
            const user = await User.findOneAndUpdate(
                { IdentityCard: req.params.id },
                { isActive: true },
                {
                    new: true,
                }
            );

            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    // [POST] /users/create
    //user register but not approve yet
    async addUser(req, res, next) {
        const newUser = new User(req.body);
        console.log(newUser);
        console.log(checkIdentityNumber(newUser));
        const isValid = checkIdentityNumber(newUser);
        console.log(isValid);
        try {
            if (isValid) {
                newUser.accountNumber =
                    Math.floor(newUser.IdentityCard / Math.pow(10, 4)) || 123;
                const savedUser = await newUser.save();
                res.status(200).json(savedUser);
            }
        } catch (e) {
            next(e);
        }
    }
}
module.exports = new userController();
