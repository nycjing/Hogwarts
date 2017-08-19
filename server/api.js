'use strict'
const api = require('express').Router();
const db = require('../db');
const Promise = require('bluebird');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

var Student = db.models.student;
var Instructor = db.models.instructor;
var House = db.models.house;


// /api/  render houseList.html

api.get('/', function (req, res, next) {
    House.findAll({})
        .then(function (houses) {
            // res.json({houses})
            res.render('index',{houses})
            // res.render('houseList', {houses});
        })
        .catch(next);


});

// /api/classes render classList.html
api.get('/classes', function (req, res, next) {
    var classes = [];
    Student.findAll()
        .then(function (students) {
            students.map(function (student) {
                return classes = classes.concat(student.classes);
            });
            classes = Array.from(new Set(classes));
            // res.json({classes})
            res.render('classesList', {classes});
        });
});


// /api/instructors render instructorList.html

api.get('/instructors/', function (req, res, next) {
    // res.send('list student')
    Instructor.findAll({
        include: [
            {model: House}
        ]
    })
        .then(function (instructors) {
            // res.json(instructors)
            res.render('instructorList', {instructors: instructors});
        })
        .catch(next);

});

// /api/students  render studentList.html

api.get('/students/', function (req, res, next) {
    // res.send('list student')
    Student.findAll({
        include: [
            {model: House}
        ]
    })
        .then(function (students) {
            // res.json(students)
           res.render('studentList', {students: students});
        })
        .catch(next);

});

// /api/add  render add student/instructor form
api.get('/add', function (req, res, next) {

    House.findAll({})
        .then(function (houses) {
            // res.json(houses)
            res.render('addstudent.html', {houses});
        })
        .catch(next);
});


// /api post data to DB
api.post('/', function (req, res, next) {
    console.log(req.body);
    var member;
    var houseName= req.body.house;
    House.findOne({
        where : {name: houseName}
    })
        .then(function (house) {

            if (req.body.dbtable === 'student'){
                member = {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    classes: req.body.classes,
                    houseId: house.id
                };
                console.log(member);

                var newStudent = Student.build(member);
                newStudent.save()
                    .then(function () {
                        res.redirect('/api');
                    })
                    .catch(next)}
            else {
                member = {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    class: req.body.classes,
                    houseId: house.id
                };
                console.log(member);

                var newInstructor = Instructor.build(member);

                newInstructor.save()
                    .then(function () {
                        res.redirect('/api');
                    })
                    .catch(next)
            }
        })
        .catch(next);


});

//api/house/:houseId render housepage.html

api.get('/house/:houseId', function (req, res, next) {

    var findHouse = House.findById(req.params.houseId);

    var findStudents = Student.findAll({
        where: {
            houseId: req.params.houseId
        }
    });

    var findInstructors = Instructor.findAll({
        where: {
            houseId: req.params.houseId
        }
    });

    Promise.all([findHouse, findStudents, findInstructors])
        .spread(function (house, students, instructors) {
            // res.json({house,students,instructors})
            res.render('housepage', {
                students: students,
                house: house,
                instructors: instructors
            });
        })
        .catch(next);

});
// /api/student/:studentId/delet  delete student
api.get('/class/:className', function (req, res, next) {

    var findStudents = Student.findAll({
        where: {
            classes: {
                $contains: [req.params.className]
            }
        },
        include: [
            {model: House}
        ]
    });

    var findInstructors = Instructor.findAll({
        where: {
            class: req.params.className
            }
        });


    Promise.all([findStudents, findInstructors])
        .spread(function (students, instructors) {
            res.render('classpage', {
                className: req.params.className,
                students: students,
                instructors: instructors
            });
        })
        .catch(next);


});




// /api/student/:studentId/delet  delete student
api.delete('/student/:studentId/delete', function (req, res, next) {
    console.log(req.params.studentId);
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
        .then(function () {
            res.send('/api');
        })
        .catch(next);

});

// /api/instructor/:instructorId/delet  delete instructor

api.delete('/instructor/:instructorId/delete', function (req, res, next) {

    Instructor.destroy({
        where: {
            id: req.params.instructorId
        }
    })
        .then(function () {
            res.redirect('/api');
        })
        .catch(next);

});

module.exports = api;