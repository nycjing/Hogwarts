'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');


module.exports = db.define('house', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imgURL: {
        type: Sequelize.VIRTUAL,
        get: function () {
            return `/${this.id}/image`;
       }
    }
});