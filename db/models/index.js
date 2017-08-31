'use strict';

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is requeired everywhere

const Student = require('./student');
const Instructor = require('./instructor');
const House = require('./house');
const Course = require('./course');

Student.belongsToMany(Course, {through: 'studentcourse',onDelete: 'cascade', hooks:true});
Course.belongsToMany(Student, {through: 'studentcourse',onDelete: 'cascade', hooks:true});
Instructor.belongsTo(Course);
Student.belongsTo(House);
Instructor.belongsTo(House);

module.exports = {
    Student: Student,
    Instructor: Instructor,
    House: House,
    Course: Course
};
