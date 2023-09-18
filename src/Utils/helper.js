const User = require('../Models/User');
const hasNull = (user) => {
    if (!user.username) {
        return false;
    } else {
        if (!user.email) {
            return false;
        } else {
            return true;
        }
    }
};
const checkUsers = (oldUser, newUser) => {
    if (oldUser) {
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
    } else {
        return false;
    }
};
// Hàm kiểm tra số có đủ 12 chữ số và kiểm tra trong cơ sở dữ liệu
const checkIdentityNumber = async (newUser) => {
    console.log(newUser);
    if (Number.isInteger(newUser.IdentityCard)) {
        if (newUser.IdentityCard) {
            console.log(newUser.IdentityCard);
            const availableUser = await User.findOne({
                IdentityCard: newUser.IdentityCard,
            });
            if (await checkUsers(availableUser, newUser)) {
                return true;
            } else {
                return hasNull(newUser) ? true : false;
            }
        }
    } else {
        return false;
    }
};

module.exports = checkIdentityNumber;
