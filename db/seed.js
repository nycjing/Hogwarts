
const Sequelize = require('sequelize');
const pkg = require('../package.json');

const name = process.env.DATABASE_NAME || pkg.name;
const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:5432/${pkg.name}`;



// create the database instance that can be used in other database files


// run our models file (makes all associations for our Sequelize objects)
require('./models')



var Promise = require('bluebird');

var db = require('./index')

var { Student, House, Course, Instructor} = require('./models/index')

var data = {
    classes: [
        {name: "Transfiguration"},
        {name: "Potions"},
        {name: "Dark Arts"}
    ],
    houses: [
        {name: "Gryffindor"},
        {name: "Ravenclaw"},
        {name: "Slytherin"},
        {name: "Hufflepuff"}
    ],
    students: [
        {name: "Harry Potter", gender: "Male", age: 13, email: "harrpotter@gmail.com", houseId:1},
        {name: "Hermione Granger", gender: "Female", age: 13, email: "hermionegranger@gmail.com", houseId:1},
        {name: "Ron Weasley", gender: "Male", age: 13, email: "ronweasley@gmail.com", houseId:1},
        {name: "Draco Malfoy", gender: "Male", age: 13, email: "dracomalfoy@gmail.com", houseId:3},
        {name: "Luna Lovegood", gender: "Female", age: 13, email: "luna@gmail.com", houseId:2},
        {name: "Cedric Diggory", gender: "Male", age: 13, email: "cedricdiggory@yahoo.com", houseId:4}
    ],
    instructors: [
        {name: "Albus Dumbledore", gender: "Male", age: 180, email: "albus@gmail.com", houseId:1},
        {name: "Minerva McGonagall", gender: "Female", age: 89, email: "minerva@gmail.com", houseId:1,courseId:1},
        {name: "Severus Snape", gender: "Male", age: 43, email: "snape@gmail.com", houseId:3,courseId:2},
    ]
};

    db.didSync
    .then(function () {
        console.log("Dropped old data, now inserting data");

        const creatingHouses = Promise.each(data.houses, function (house) {
            return House.create(house);
        });
        const creatingClasses = Promise.each(data.classes, function (course) {
            return Course.create(course);
        });

        const creatingStudents = Promise.each(data.students, function (student) {
            return Student.create(student);
        });
        const creatingInstructors = Promise.each(data.instructors, function (instructor) {
            return Instructor.create(instructor);
        });
         return Promise.all([creatingHouses, creatingClasses, creatingStudents , creatingInstructors ])
        .then(() =>{
            console.log('Finished inserting data');
        })
            .catch(function (err) {
                console.error('There was totally a problem', err, err.stack);
            })
            .finally(function () {
                db.close(); // creates but does not return a promise
                return null; // stops bluebird from complaining about un-returned promise
            });
    })


