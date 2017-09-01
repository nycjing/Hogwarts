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
var Course = db.models.course;


// /api/  render houseList.html

api.get('/', function (req, res, next) {
    House.findAll({})
        .then(function (houses) {
            res.json({houses})
        })
        .catch(next);


});

// /api/classes render classList.html
api.get('/courses', function (req, res, next) {
    Course.findAll({})
        .then(function (courses) {
            res.json({courses})
        })
        .catch(next);

});

// /api/classes/:className render classpage.html
api.get('/course/:courseId', function (req, res, next) {

    const findStudents = Course.findById(req.params.courseId)
        .then(course =>{
            console.log('show me the detail',course.name);
            return course.getStudents();
        })

    const findInstructors = Instructor.findAll({
        where :{
            courseId: req.params.courseId
        }
    });

    Promise.all([findStudents, findInstructors])
        .spread(function (students, instructors) {
            res.json({students,instructors})
        })
        .catch(next);

});

// /api/courses/ post course data to db

api.post('/courses', function (req, res, next) {
    console.log(req.body.newCourse);
    const courseName = req.body.newCourse
    const newCourse = Course.build({name:courseName});
    newCourse.save()
        .then(function () {
            console.log(newCourse );
            res.json(newCourse)
        })
        .catch(next)
});


// /api/instructors render instructorList.html

api.get('/instructors/', function (req, res, next) {
    Instructor.findAll({
        include: [
            {model: House},
            {model: Course}
        ]
    })
        .then(function (instructors) {
            res.json(instructors)
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
            res.json(students)
        })
        .catch(next);

});

api.get('/students/:studentId', function (req, res, next) {
    Student.findById(req.params.studentId)
        .then(student => res.json(student))
        .catch(next);
});

// /api/add  render add student/instructor form
api.get('/add', function (req, res, next) {

    House.findAll({})
        .then(function (houses) {
            res.json(houses)
        })
        .catch(next);
});


// /api post member data to DB
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
                    houseId: house.id
                };
                console.log(member);

                var newStudent = Student.build(member);
                newStudent.save()
                    .then(()=> {
                        newStudent.addCourse(req.body.course);
                        res.json(newStudent)
                    })
                    .catch(next)}
            else {
                member = {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    houseId: house.id,
                    courseId: req.body.course
                };
                console.log(member);

                var newInstructor = Instructor.build(member);

                newInstructor.save()
                    .then(function () {
                        res.json(newInstructor)
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
            res.json({house,students,instructors})

        })
        .catch(next);

});



//  /api/student/assign/  assign course to student
api.put('/student/assign', function(req,res,next){
    console.log('input,',typeof req.body.studentId, typeof req.body.course);
    Course.findById(req.body.course)
        .then((course)=>{
            return course.addStudent(req.body.studentId,{through: 'studentcourse'});
        })
        .then(()=>{
            const findStudents = Course.findById(req.body.course).then(course=>{return course.getStudents()});
            const findCourses = Student.findById(req.body.studentId).then(student=>{return student.getCourses()});
           return Promise.all([findStudents, findCourses])
        })
        .spread(function (students, courses) {
            res.json({students,courses})
        })
        .catch(next);
});

//  /api/student/remove/  remove student from course
api.put('/student/remove', function(req,res,next){

    Course.findById(req.body.courseId)
        .then((course)=>{
            return course.removeStudent(req.body.studentId,{through: 'studentcourse'});
        })
        .then(()=>{
            return Course.findById(req.body.courseId)
        })
        .then((course)=>{
            return course.getStudents();
        })
        .then(students => {
            res.json({students})
        })
});

//  /api/student/remove/  remove course from student
api.put('/course/remove', function(req,res,next){
    console.log(req.body.studentId,req.body.courseId )
    Student.findById(req.body.studentId)
        .then((student)=>{
            return student.removeCourse(req.body.courseId,{through: 'studentcourse'});
        })
        .then(()=>{
            return Student.findById(req.body.studentId)
        })
        .then((student)=>{
            return student.getCourses();
        })
        .then(courses => {
            res.json({courses})
        })
});
// /api/students/${courseId}/course get all the student signup to one course

api.get('/students/:courseId/course', function(req,res,next){
    Course.findAll({
        where:{
            id: req.params.courseId,
        }
    })
        .then((courses)=>{
        console.log('want to see the join table', courses);
            return course.getStudents();
        })
        .then((students) => {
            console.log('kids with that class',students);
            res.json({students})
        } )

});

// /api/courses/${studentId}/student get all the courses signup to one student

api.get('/courses/student/:studentId', function(req,res,next){
   const findCourses = Student.findById(req.params.studentId)
        .then(student=>{
            console.log('who is this kid?',student.name);
            return student.getCourses();
        })
        .then((courses) => {
            console.log('kids with that classes',{courses});
            res.json({courses})
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
            // res.redirect('/api');
            res.send('done');
        })
        .catch(next);

});

// /api/course/:courseId/delet  delete course

api.delete('/course/:courseId/delete', function (req, res, next) {

    Course.destroy({
        where: {
            id: req.params.courseId
        }
    })
        .then(function () {
            res.send('done');
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
            // res.send('/api');
            res.send('done');
        })
        .catch(next);

});


module.exports = api;