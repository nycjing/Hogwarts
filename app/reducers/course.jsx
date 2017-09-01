import axios from 'axios';

//ACTION TYPES
const GET_COURSES = 'GET_COURSES';
const WRITE_COURSE = 'WRITE_COURSE';
const POST_COURSE = 'POST_COURSE';
const REMOVE_COURSE = 'REMOVE_COURSE'; //take a student off the course
const ASSIGN_COURSE_TO_STUDENT = 'ASSIGN_COURSE_TO_STUDENT'; //assign a student to the course
const GOT_STUDENT_COURSE = 'GOT_STUDENT_COURSE';  // find all courses for a student
const GOT_COURSE_STUDENT = 'GOT_COURSE_STUDENT';  // find all students for a course


const initialState = {
    courses : [],
    newCourseEntry : '',
    studentCourses : [],
    courseStudents : []
};

export function fetchCourses () {
    return function thunk (dispatch) {
        return axios.get('/api/courses')
            .then(res => res.data.courses)
            .then(courses => {
                dispatch(gotCoursesFromServer(courses))
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

export function gotCoursesFromServer (courses) {
    return {
        type: GET_COURSES,
        courses
    };
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

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case GET_COURSES:
            return Object.assign({}, state, {courses: action.courses});
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
