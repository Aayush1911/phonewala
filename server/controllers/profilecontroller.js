const user = require('../models/user')
const profile = require('../models/profile')

const addcontroller = async (req, res) => {
    try {
        const userId = req.user.id
        const user_find = await user.findById(userId)
        if (!user_find) {
            return res.send("user does not exist")
        }
        const name = user_find.name;
        const email = user_find.email;
        const { address } = req.body;
        let newprofile = new profile({ userId: userId, name: name, email: email, address: address })
        newprofile = await newprofile.save()
        return res.send(newprofile)

    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    addcontroller
}