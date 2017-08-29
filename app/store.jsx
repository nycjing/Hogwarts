import { createStore, applyMiddleware } from 'redux';
//import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import axios from 'axios';

// ACTION TYPES

const GET_HOUSES = 'GET_HOUSES';
const GET_COURSES = 'GET_COURSES';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const REMOVE_INSTRUCTOR = 'REMOVE_INSTRUCTOR';

const initialState = {
    houses: [],
    courses: [],
    students: [],
    instructors: []
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
        default: return state
    }
};


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
