const { User } = require('../models');

const userData = [
    {
        first_name: 'Omar',
        last_name: 'Pacheco',
        username: 'brOmar',
        email: 'omarp@gmail.com',
        password: 'password',
    },
    {
        first_name: 'Nina',
        last_name: 'Persaud',
        username: 'ninachu',
        email: 'npersaud@gmail.com',
        password: 'password',
    },
    {
        first_name: 'Kevin',
        last_name: 'Lai',
        username: 'kLai',
        email: 'klai@gmail.com',
        password: 'password',
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
