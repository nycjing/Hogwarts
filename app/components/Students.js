import React from 'react';
import {Link} from 'react-router-dom';
import store, {fetchStudents, deleteStudent } from '../store';

export default class Students extends React.Component {

    constructor() {
        super();
        this.state = store.getState();
        Students.handleRemove = Students.handleRemove.bind(this)
    }

    componentDidMount () {
        store.dispatch(fetchStudents());
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    static handleRemove (studentId) {

        store.dispatch(deleteStudent (studentId));
    }

    render() {
        const students = this.state.students;

        return (
            <div className="container">
                <h3>Student List</h3>
                <h3>Student List</h3>
            <table className='table'>
                <thead>
                <tr>

                    <th>Name</th>
                    <th>House</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    students && students.map(student => (
                        <tr key={student.id}>

                            <td> <Link to={`/students/${student.id}`}>{ student.name }</Link></td>
                            <td>
                                <span>{ student.house.name }</span>
                            </td>
                            <td>
                                <input onClick={()=> Students.handleRemove(student.id)} type='button' value='x'/>
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