import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Housepage extends React.Component {
    constructor() {
        super();
        this.state = {
            house: {},
            students:[],
            instructors: []
        };

    }

    componentDidMount() {
        axios.get(`/api/house/${houseId}`)
            .then(res => res.data)
            .then((house,students,instructors) => this.setState({
                house, students, instructors}));
    }

    render() {
        const house = this.state.house;
        const students = this.state.students;
        const instructors = this.state.instructors;
        console.log(house,students,instructors);
        return (
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">

                            <h3>{house.name}</h3>
                            <img src={`/img/${house.name}.jpg`} name={house.name} height="300" width="300">

                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <h3>Student List</h3>
                            {
                                students.map(student=>(
                                            <h2><Link to={`/api/student/${student.id}`}>${student.name}</Link></h2>
                                    )
                                )
                            }
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <h3>Instructor</h3>
                            {
                                instructors.map(instructor=>(
                                        <h2><Link to={`/api/instructor/${instructor.id}`}>${instructor.name}</Link></h2>
                                    )
                                )
                            }
                        </div>
                    </div>

                )
        }

    }