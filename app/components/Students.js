import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store, {fetchStudents, deleteStudent } from '../store';

export default class Students extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         students: [],
    //     };
    //     this.handleRemove = this.handleRemove.bind(this)
    // }
    //
    // componentDidMount() {
    //     axios.get(`/api/students`)
    //         .then(res => {
    //             return res.data
    //         })
    //         .then(data => {
    //             this.setState({
    //                 students: data,
    //             })
    //         });
    // }
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        store.dispatch(fetchStudents())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleRemove (studentId) {
        // axios.delete(`/api/student/${studentId}/delete`)
        //     .then( ()=> {
        //         return this.setState({
        //             students: this.state.students.filter(student => student.id !== studentId)
        //         })
        //     })
        //     .catch(err => console.error(err));
        console.log('studentId pass to the store',studentId);
        store.dispatch(deleteStudent (studentId));
    }

    render() {
        const students = this.state.students;
        console.log(students);
        return (
            <div className="container">
                <h3>Student List</h3>
                <h3>Student List</h3>
            <table className='table'>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>House</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    students && students.map(student => (
                        <tr key={student.id}>
                            <td></td>
                            <td> <Link to={`/students/${student.id}`}>{ student.name }</Link></td>
                            <td>
                                <span>{ student.house.name }</span>
                            </td>
                            <td>
                                <input onClick={()=> this.handleRemove(student.id)} type='button' value='x'/>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            </div>
        )
    }
}