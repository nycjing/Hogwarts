import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import axios from 'axios';

//ACTION TYPES

const GET_HOUSES = 'GET_HOUSES';
const GET_COURSES = 'GET_COURSES';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const REMOVE_INSTRUCTOR = 'REMOVE_INSTRUCTOR';
const WRITE_COURSE = 'WRITE_COURSE';
const POST_COURSE = 'POST_COURSE';
const REMOVE_COURSE = 'REMOVE_COURSE';
const ASSIGN_COURSE_TO_STUDENT = 'ASSIGN_COURSE_TO_STUDENT';
const GOT_STUDENT_COURSE = 'GOT_STUDENT_COURSE';
const GOT_COURSE_STUDENT = 'GOT_COURSE_STUDENT';


const initialState = {
    houses : [],
    courses : [],
    students : [],
    instructors : [],
    newCourseEntry : '',
    studentCourses : [],
    courseStudents : []
};

export function fetchHouses () {
    return function thunk (dispatch) {
        return axios.get('/api/')
            .then(res => res.data.houses)
            .then(houses => {
                dispatch(gotHousesFromServer(houses))
            });
    };
}

export function fetchCourses () {
    return function thunk (dispatch) {
        return axios.get('/api/courses')
            .then(res => res.data.courses)
            .then(courses => {
                dispatch(gotCoursesFromServer(courses))
            });
    };
}

export function fetchStudents () {
    return function thunk (dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                dispatch(gotStudentsFromServer(students))
            });
    };
}

export function fetchStudentsCourse(courseId){
    return function thunk (dispatch) {
        return axios.get(`/api/course/${courseId}`)
            .then(res => res.data)
            .then(({students, instructors}) => {
                console.log('get back from fron',students, instructors);
                dispatch(gotStudentsOneCourse(students))
            });
    }
}

export function fetchCoursesStudent(studentId){
    return function thunk (dispatch) {
        return axios.get(`/api/courses/student/${studentId}`)
            .then(res => res.data)
            .then(({courses}) => {
                console.log('what I got?',courses);
                dispatch(gotCoursesOneStudent(courses));
            });
    }
}

export function deleteStudent (studentId) {
    return function thunk (dispatch) {

        console.log('studentId in  the store',`/api/student/${studentId}/delete`)
        return   axios.delete(`/api/student/${studentId}/delete`)
            .then( ()=> {
                dispatch(removeStudent(studentId))
            })
            .catch(err => console.error(err));
    }
}

export function fetchInstructors () {
    return function thunk (dispatch) {
        return axios.get('/api/instructors')
            .then(res => res.data)
            .then(instructors => {
                dispatch(gotInstructorsFromServer(instructors))
            });
    };
}

export function deleteInstructor (instructorId) {
    return function thunk (dispatch) {

        return   axios.delete(`/api/instructor/${instructorId}/delete`)
            .then( ()=> {
                dispatch(removeInstructor(instructorId))
            })
            .catch(err => console.error(err));
    }
}

export function deleteCourse (courseId) {
    return function thunk (dispatch) {

        return   axios.delete(`/api/course/${courseId}/delete`)
            .then( ()=> {
                dispatch(removeCourse(courseId))
            })
            .catch(err => console.error(err));
    }
}

export function postCourseToServer(newCourseEntry){
    return function thunk (dispatch) {
        return axios.post('/api/courses', newCourseEntry)
            .then((course)=>{
                dispatch(postCourse(course.data));
                dispatch(writeCourse(''));
            })
    }
}

export function assignCourseToStudent (studentId, course){

    return function thunk (dispatch){
        const body = {studentId, course}
        return axios.put('/api/student/assign', body)
            .then(res=>res.data)
            .then(({students,courses})=>{
                console.log('update student, course', students, courses)
                dispatch(gotStudentsOneCourse(students))
                dispatch(gotCoursesOneStudent(courses))
            })
    }

}

export function removeStudentCourse(studentId,courseId){
    return function thunk (dispatch){
        const body = {studentId, courseId}
        return axios.put('/api/student/remove', body)
            .then(res=>res.data)
            .then(({students})=>{
                console.log('update student', students)
                dispatch(gotStudentsOneCourse(students))
            })
    }
}

export function removeCourseStudent(studentId,courseId){
    return function thunk (dispatch){
        const body = {studentId, courseId}
        return axios.put('/api/course/remove', body)
            .then(res=>res.data)
            .then(({courses})=>{
                console.log('update course', courses)
                dispatch(gotCoursesOneStudent(courses))
            })
    }
}

export function gotHousesFromServer (houses) {
    return {
        type: GET_HOUSES,
        houses
    };
}
export function gotCoursesFromServer (courses) {
    return {
        type: GET_COURSES,
        courses
    };
}
export function gotStudentsFromServer (students) {
    return {
        type: GET_STUDENTS,
        students
    };
}

export function removeStudent (studentId) {
    return {
        type: REMOVE_STUDENT,
        studentId
    }
}

export function gotInstructorsFromServer (instructors) {
    return {
        type: GET_INSTRUCTORS,
        instructors
    };
}

export function removeInstructor (instructorId) {
    return {
        type: REMOVE_INSTRUCTOR,
        instructorId
    }
}

export function removeCourse ( courseId) {
    return {
        type: REMOVE_COURSE,
        courseId
    }
}

export function writeCourse(newCourseEntry){
    return{
        type: WRITE_COURSE,
        newCourseEntry
    }
}

export function postCourse (newCourseEntry){
    return {
        type: POST_COURSE,
        newCourseEntry
    }
}

export function gotStudentsOneCourse (courseStudents){
    return{
        type: GOT_COURSE_STUDENT,
        courseStudents
    }
}

export function gotCoursesOneStudent(studentCourses) {
    return{
        type: GOT_STUDENT_COURSE,
        studentCourses
    }
}

const rootReducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_HOUSES:
            return Object.assign({}, state, {houses: action.houses});
        case GET_COURSES:
            return Object.assign({}, state, {courses: action.courses});
        case GET_STUDENTS:
            return Object.assign({}, state, {students: action.students});
        case REMOVE_STUDENT:
            return Object.assign({}, state, {
                students: state.students.filter(student => student.id !== action.studentId)});
        case GET_INSTRUCTORS:
            return Object.assign({}, state, {instructors: action.instructors});
        case REMOVE_INSTRUCTOR:
            return Object.assign({}, state, {
                instructors: state.instructors.filter(instructor => instructor.id !== action.instructorId)});
        case WRITE_COURSE:
            return Object.assign({}, state, {newCourseEntry: action.newCourseEntry});
        case POST_COURSE:
            return Object.assign({}, state, {courses: state.courses.concat(action.newCourseEntry)});
        case REMOVE_COURSE:
            return Object.assign({},state,{courses: state.courses.filter(course=> course.id !== action.courseId)});
        case GOT_COURSE_STUDENT:
            return Object.assign({}, state, {courseStudents : action.courseStudents});
        case GOT_STUDENT_COURSE:
            return Object.assign({}, state, {studentCourses : action.studentCourses});
        default: return state
    }
};


export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger())))
