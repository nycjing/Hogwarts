import { combineReducers } from 'redux'
import house from './house';
import course from './course';
import student from './student';
import instructor from './instructor'

const rootReducer = combineReducers({
    house,
    course,
    student,
    instructor
});

export default rootReducer

// export action creators
export * from './house';
export * from './course';
export * from './student';
export * from './instructor';

