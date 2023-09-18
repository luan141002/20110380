const User = require('../Models/User');
const myGroup = require('../Models/myGroup.js');
class siteController {
    // [GET] /
    async index(req, res, next) {
        try {
            // the mongoDB library available function
            // const updatedUser = await User.find();
            res.status(200).json(myGroup);
        } catch (err) {
            next(err);
        }
    }
    // [GET] /20110380/:id
    async loadUserById(req, res, next) {
        try {
            // the mongoDB library available function
            const User = await myGroup.find((student) => {
                if (student.id === Number(req.params.id)) return student;
            });

            console.log(User);
            res.status(200).json(User ? User : 'Not valid');
        } catch (err) {
            next(err);
        }
    }
    // [POST] /20110380/:id
    async addUserById(req, res, next) {
        const id = Number(req.params.id);
        const { name } = req.body;
        console.log(req.body);

        if (!id || !name) {
            res.status(400).send('Not valid');
            return;
        }

        // Check if the member already exists in mygroup
        const existingMember = myGroup.find((member) => member.id === id);

        if (existingMember) {
            res.status(400).send('Member already exists');
            return;
        }

        // Add the new member to mygroup
        myGroup.push({ id, name });

        res.json(myGroup);
    }
    // [GET] /message/:id
    async messageController(req, res, next) {
        if (req.params.id) {
            const User = await myGroup.find((student) => {
                if (student.id === Number(req.params.id)) return student;
            });
            res.status(200).send(
                `<html><body><ul><li> ${User.name}</li></ul></body></html>`
            );
        } else {
            res.status(200).json(myGroup);
        }
    }
}
module.exports = new siteController();
