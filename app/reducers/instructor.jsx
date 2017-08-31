import axios from 'axios';

//ACTION TYPES

const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
const REMOVE_INSTRUCTOR = 'REMOVE_INSTRUCTOR';

const initialState = {

    instructors : [],

};


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

// REDUCER
export default function reducer (state = initialState, action) {
    switch(action.type) {
        case GET_INSTRUCTORS:
            return Object.assign({}, state, {instructors: action.instructors});
        case REMOVE_INSTRUCTOR:
            return Object.assign({}, state, {
                instructors: state.instructors.filter(instructor => instructor.id !== action.instructorId)});
        default: return state
    }
};
