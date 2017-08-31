import React from 'react';
import {Link} from 'react-router-dom';
import store, {fetchCourses, deleteCourse} from '../store';
import NewCourse from './NewCourse'

export default class Courses extends React.Component {

    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        store.dispatch(fetchCourses())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }
    handleRemove (courseId) {
        console.log('courseId pass to the store',courseId);
        store.dispatch(deleteCourse(courseId));
    }

    render() {
        const courses = this.state.courses;
        console.log('course list',courses);
        return (
            <div className="container">
                <h3>Class List</h3>
                <h3>Class List</h3>
                    {
                        courses && courses.map(course=> (
                        <div>
                            <div className="col-sm-6">
                                <li >
                                <Link value={course.id} key = {course.id} to={`/classes/${course.id}`}>{course.name} </Link>
                                </li>
                            </div>
                            <input className="col-cm-1" onClick={()=> this.handleRemove(course.id)} type='button' value='x'/>
                        </div>
                        ))
                    }
                    <div>
                    <NewCourse />
                    </div>
            </div>
        )
    }
}