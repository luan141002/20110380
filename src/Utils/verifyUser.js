const User = require('../Models/User');
class siteController {
    // check whether they are approved or not
    async verifyUser(req, res, next) {
        const user = await User.findOne({
            accountNumber: req.params.accountNumber,
        });
        if (user) {
            next();
        } else {
            if (err) return next(err);
        }
    }
    // check whether they are admin or not
    async verifyAdmin(req, res, next) {
        verifyUser(req, res, next, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                if (err) return next(err);
            }
        });
    }
    hasNull(user) {
        if (!user.username) {
            return false;
        } else {
            if (!user.email) {
                return false;
            } else {
                return true;
            }
        }
    }
    checkUsers(oldUser, newUser) {
        if (oldUser.username !== newUser.username) {
            return false;
        } else {
            if (oldUser.email !== newUser.email) {
                return false;
            } else if (oldUser.nickName !== newUser.nickName) {
                return false;
            } else {
                return true;
            }
        }
    }
    // Hàm kiểm tra số có đủ 12 chữ số và kiểm tra trong cơ sở dữ liệu
    async checkIdentityNumber(newUser) {
        if (
            Number.isInteger(newUser.identityCard) &&
            newUser.identityCard.toString().length === 12
        ) {
            const availableUser = await User.findOne({
                identityCard: newUser.identityCard,
            });
            if (await checkUsers(availableUser, newUser)) {
                return true;
            } else {
                return hasNull(newUser) ? true : false;
            }
        } else {
            return false;
        }
    }
}
module.exports = new siteController();
