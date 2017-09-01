import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store, { fetchCourses, fetchInstructors, fetchStudents,fetchStudentsCourse,removeStudentCourse } from '../store';
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
    handleRemove (studentId, courseId) {
        console.log('courseId pass to the store',courseId);
        store.dispatch(removeStudentCourse(studentId,courseId));
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
                            <div className="col-lg-6 col-md-6 col-sm-6" key={course.id}>
                            <h3>{course.name}</h3>
                            <img src={`/img/class.jpg`} name={course.name} height="300" width="300"/>
                            </div>
                        )}
                    <h3>Instructor</h3>
                    {
                        (instructors) && instructors.map(instructor => (
                                <div className="col-lg-6 col-md-6 col-sm-6" key={instructor.id}>
                                    <li>{instructor.name}</li>
                                </div>
                            )
                        )
                    }

                    <h3>Class student list</h3>
                    {
                        (courseStudents) && courseStudents.map(student => (
                            <div key={student.id}>
                                <div className="col-lg-5 col-md-5 col-sm-5" >
                                    <li>{student.name}</li>
                                </div>
                                <input className="col-cm-1" onClick={()=> this.handleRemove(student.id, courseId)} type='button' value='x'/>
                            </div>
                            )
                        )
                    }
                    <AssignStudent course = {courseId}/>
                </div>
            </div>

        )
    }

}