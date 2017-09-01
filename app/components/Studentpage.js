import React from 'react';
import axios from 'axios';
import AssignCourse from './AssignCourse';
import store, {fetchStudents, fetchCourses, fetchHouses ,fetchCoursesStudent,removeCourseStudent} from '../store';


export default class Studentpage extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        const studentId = +this.props.match.params.studentId;
        store.dispatch(fetchStudents());
        store.dispatch(fetchCourses());
        store.dispatch(fetchHouses());
        store.dispatch(fetchCoursesStudent(studentId));
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleRemove (studentId, courseId) {
        console.log('courseId pass to the store',studentId,courseId);
        store.dispatch(removeCourseStudent(studentId,courseId));
    }

    render() {
        const studentId = +this.props.match.params.studentId;
        const studentCourses = this.state.studentCourses
        console.log('student courses',studentCourses )
        const student = this.state.students.filter(student => student.id === studentId)[0];
        const house = this.state.houses.filter(house => house.id === student.houseId)[0];
        const courses = this.state.courses;
        return (
            <div className="container">
                <h3>Student detail Page</h3>
                <div className="row">

                    {(student) && (house) && (
                        <div className="col-lg-6 col-md-6 col-sm-12" key={student.id}>
                            <h3>{student.name}</h3>
                            <li>Email: {student.email}</li>
                            <li>Age: {student.age}</li>
                            <li>Gender: {student.gender}</li>
                            <li>House: {house.name}</li>
                        </div>
                    )}

                    <h4>Sign up Class</h4>

                    {(studentCourses) && studentCourses.map(course => (
                            <div key={course.id}>
                                <div className="col-lg-5 col-md-5 col-sm-5" >
                                    <li>{course.name}</li>
                                </div>
                                <input className="col-cm-1" onClick={()=> this.handleRemove(studentId, course.id)} type='button' value='x'/>
                            </div>
                        )
                    )}
                    <AssignCourse student = {studentId}/>




                </div>
            </div>

        )}
}