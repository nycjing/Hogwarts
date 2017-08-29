'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');


module.exports = db.define('course', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});