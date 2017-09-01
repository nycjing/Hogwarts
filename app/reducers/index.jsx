import { combineReducers } from 'redux'
import houses from './house';
import courses from './course';
import students from './student';
import instructors from './instructor'

const rootReducer = combineReducers({
houses,
courses,
students,
instructors
});

export default rootReducer

// export action creators
export * from './house';
export * from './course';
export * from './student';
export * from './instructor';

