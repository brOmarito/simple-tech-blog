const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;

            res.status(200).json(userData);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    console.log("Made it in the login API");
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({
            where: {
                email: email,
            },
        });
        if (!userData.checkPassword(password)) {
            console.log("Password fail");
            res.status(404).json({message: "The email or passwor is incorrect."});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            console.log(req.session.user_id);
            res.status(200).json({ user: userData, message: "Successfully logged in!" });
        });
    } catch (error) {
        res.status(400).json({
            message: "Something happened when logging you in.",
            error
        });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.user_id) {
        req.session.destroy(() => res.status(204).end());
    } else {
        res.status(204).end();
    }
})

module.exports = router;
