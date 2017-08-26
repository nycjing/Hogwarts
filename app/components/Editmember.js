import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class SingleStudent extends React.Component {
    constructor() {
        super();
        this.state ={
            student: {},
        };

    }

    componentDidMount() {
        const studentId = this.props.match.params.studentId;
        console.log(studentId)
        axios.get(`/api/students/${studentId}`)
            .then(res => {
                console.log(res.data);
                return res.data
            })
            .then(data => {
                console.log('will be the input---', data)
                this.setState({
                    student: data
                })

            });
    }

    render() {
        const student = this.state.student;
        console.log(student)
        return (
            <div className="container">



            </div>
        )
    }
}