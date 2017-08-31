import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store, {fetchInstructors, deleteInstructor } from '../store';

export default class Instructors extends React.Component {

    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        store.dispatch(fetchInstructors())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    static handleRemove (instructorId) {
        console.log('studentId pass to the store',instructorId);
        store.dispatch(deleteInstructor(instructorId));
    }


    render() {
        const instructors = this.state.instructors;
        console.log(instructors);
        return (
            <div className="container">
                <h3>Instructor List</h3>
                <h3>Instructor List</h3>
            <table className='table'>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    instructors && instructors.map(instructor => (
                        <tr key={instructor.id}>
                            <td></td>
                            <td> <Link to={`/instructors/${instructor.id}`}>{ instructor.name }</Link></td>
                            <td>
                                <span>{ instructor.course.name }</span>
                            </td>
                            <td>
                                <input onClick={()=> Instructors.handleRemove(instructor.id)} type='button' value='x'/>
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