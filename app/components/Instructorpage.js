import React from 'react';
import axios from 'axios';
// import store, {fetchInstructors, fetchCourses, fetchHouses } from '../store';
import {fetchInstructors, fetchCourses, fetchHouses } from '../reducers';
import store from '../store';


export default class Coursepage extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        store.dispatch(fetchInstructors());
        store.dispatch(fetchCourses());
        store.dispatch(fetchHouses());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        const instructorId = +this.props.match.params.instructorId;
        const instructor = this.state.instructors.instructors.filter(instructor => instructor.id === instructorId)[0];
        const house = this.state.houses.houses.filter(house => house.id === instructor.houseId)[0];
        const course = this.state.courses.courses.filter(course => course.id === instructor.courseId)[0];
              return (
            <div className="container">
                <h3>Instructor detail Page</h3>
                <div className="row">

                    {(instructor) && (
                        <div className="col-lg-6 col-md-12 col-sm-12" key={instructor.id}>
                            <h3>{instructor.name}</h3>
                            <li>Email: {instructor.email}</li>
                            <li>Age: {instructor.age}</li>
                            <li>Gender: {instructor.gender}</li>
                            <li>House: {house.name}</li>
                            <li>Course: {course.name}</li>
                        </div>
                    )}
                </div>
            </div>

        )
    }

}