'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');


module.exports = db.define('instructor', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        gender: {
            type: Sequelize.ENUM('Male', 'Female'),
        },
        age: {
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            }
        },
        class: {
            type: Sequelize.STRING,
        }
    },
    {
        classMethods: {
            findByClass: function (c){
                return this.findOne({
                    where: {
                        class: {
                            $eq: c,
                        }
                    }
                });
            }
        }

    }

);