import axios from 'axios';

//ACTION TYPES


const GET_COURSES = 'GET_COURSES';
const WRITE_COURSE = 'WRITE_COURSE';
const POST_COURSE = 'POST_COURSE';
const REMOVE_COURSE = 'REMOVE_COURSE';
const ASSIGN_COURSE_TO_STUDENT = 'ASSIGN_COURSE_TO_STUDENT';
const GOT_STUDENT_COURSE = 'GOT_STUDENT_COURSE';
const GOT_COURSE_STUDENT = 'GOT_COURSE_STUDENT';

const initialState = {
    courses : [],
    newCourseEntry : '',
    courseStudents : [],
    studentCourses : [],
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
            .then((student)=>{
                console.log('update student', student)
            })

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

export function gotStudentsOneCourse (students){
    return{
        type: GOT_COURSE_STUDENT,
        students
    }
}

// REDUCER
export default function reducer (state = initialState, action) {
    switch(action.type) {
        case GET_COURSES:
            return Object.assign({}, state, {courses: action.courses});
        case GOT_STUDENT_COURSE:
            return Object.assign({}, state, {courseStudents : action.students});
        case WRITE_COURSE:
            return Object.assign({}, state, {newCourseEntry: action.newCourseEntry});
        case POST_COURSE:
            return Object.assign({}, state, {courses: state.courses.concat(action.newCourseEntry)});
        case REMOVE_COURSE:
            return Object.assign({},state,{courses: state.courses.filter(course=> course.id !== action.courseId)});
        default: return state
    }
};
