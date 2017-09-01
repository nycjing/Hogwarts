import axios from 'axios';

//ACTION TYPES


const GET_STUDENTS = 'GET_STUDENTS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';


const initialState = {

    students : [],

};


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


// REDUCER
export default function reducer (state = initialState, action) {
    switch(action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, {students: action.students});
        case REMOVE_STUDENT:
            return Object.assign({}, state, {
                students: state.students.filter(student => student.id !== action.studentId)});
        default: return state
    }
};
