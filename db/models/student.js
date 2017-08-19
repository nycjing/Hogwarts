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
        },
        classes: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
            set: function (classes) {

                classes = classes || [];

                if (typeof classes === 'string') {
                    classes = classes.split(',').map(function (str) {
                        return str.trim();
                    });
                }

                this.setDataValue('classes', classes);

            }
        }
    },
    {
        classMethods: {
            findByClass: function (c) {
                return this.findAll({
                    where: {
                        classes: {
                            $contains: [c]
                        }
                    }
                });
            }
        }

    }
);
