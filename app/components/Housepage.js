import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Housepage extends React.Component {
    constructor() {
        super();
        this.state = {
            house: {},
            students: [],
            instructors: []
        };

    }

    componentDidMount() {
        const houseId = this.props.match.params.houseId;
        console.log(houseId)
        axios.get(`/api/house/${houseId}`)
            .then(res => {
                console.log(res.data);
                return res.data
            })
            .then(data => {
                this.setState({
                    house: data.house,
                    students: data.students,
                    instructors: data.instructors
                })

            });
    }

    render() {
        const house = this.state.house;
        const students = this.state.students;
        const instructors = this.state.instructors;
        console.log(house, students, instructors.length);
        return (
            <div className="container">
                <h3>Single House Page</h3>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12" key={house.id}>
                    <h3>{house.name}</h3>
                    <img src={`/img/${house.name}.jpg`} name={house.name} height="300" width="300"/>
                </div>
                <h3>Student List</h3>
                {
                    (students) && students.map(student => (
                        <div className="col-lg-6 col-md-6 col-sm-12" key={student.id}>
                            <li>{student.name}</li>
                        </div>
                        )
                    )
                }
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