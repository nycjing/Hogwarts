import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store, { fetchCourses, fetchInstructors, fetchStudents,fetchStudentsCourse } from '../store';
import AssignStudent from './AssignStudent';


export default class Coursepage extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        const courseId = +this.props.match.params.classId;
        store.dispatch(fetchCourses());
        store.dispatch(fetchStudents());
        store.dispatch(fetchStudentsCourse(courseId));
        store.dispatch(fetchInstructors());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        const courseId = +this.props.match.params.classId;
        console.log('hope with course ID', this.state.students);
        const course = this.state.courses.filter(course => course.id === courseId)[0];
        const courseStudents = this.state.courseStudents
        // const students = this.state.students.filter(student=>student.courseId === courseId);
        const students = this.state.students;
        const instructors = this.state.instructors.filter(instructor => instructor.courseId === courseId);
        console.log(course, students, instructors.length);
        return (
            <div className="container">
                <h3>Single Course Page</h3>
                <div className="row">

                        {(course) && (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={course.id}>
                            <h3>{course.name}</h3>
                            <img src={`/img/class.jpg`} name={course.name} height="300" width="300"/>
                            </div>
                        )}

                    <h3>Student List</h3>
                    {
                        (courseStudents) && courseStudents.map(student => (
                                <div className="col-lg-6 col-md-6 col-sm-12" key={student.id}>
                                    <li>{student.name}</li>
                                </div>
                            )
                        )
                    }
                    <AssignStudent course = {courseId}/>
                    <h3>Instructor</h3>
                    {
                        (instructors) && instructors.map(instructor => (
                                <div className="col-lg-6 col-md-6 col-sm-12" key={instructor.id}>
                                    <li>{instructor.name}</li>
                                </div>
                            )
                        )
                    }
                </div>
            </div>

        )
    }

}