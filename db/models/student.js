'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');


module.exports = db.define('student', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.ENUM('Male', 'Female')
        },
        age: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            }
        }
    }
);
