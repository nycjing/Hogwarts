import React from 'react';
import axios from 'axios';
import AssignCourse from './AssignCourse';

export default class Addmember extends React.Component {
    constructor() {
        super();
        this.state = {
            name:   '',
            email:  '',
            age:    11,
            gender: 'Male',
            dbtable: '',
            house: 'Gryffindor',
            course: '',
            houses: [],
            courses:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/')
            .then(res => res.data)
            .then(data => this.setState({houses:data.houses}));
        axios.get('/api/courses')
            .then(res => res.data.courses)
            .then(courses => {
                this.setState({courses:courses})
            });
    }

    handleChange (evt) {
        const value = evt.target.value;
        console.log(value)
        this.setState({
            [evt.target.name]: value
        });
    }

    handleSubmit (evt) {
        evt.preventDefault();
        const inputbody = this.state;
        axios.post(`/api/`, inputbody)
            .then(res => res.data)
            .then(data => {
                this.setState({
                    house: data.house,
                    students: data.students,
                    instructors: data.instructors
                })
            });
        this.setState({
            name:   '',
            email:  '',
            age:    11,
            gender: 'Male',
            dbtable: '',
            house: 'Gryffindor',
            course: ''
        });
    }

    render() {
        const houses = this.state.houses;
        const courses = this.state.courses;
        return (
            <div className="container">
                <h3>Add a member</h3>
                <h3>Add a member</h3>
            <form onSubmit={this.handleSubmit}>
             <section>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                        <input name="name" type="text" className="form-control" value={this.state.name} required onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                        <input name="email" type="text" className="form-control" value={this.state.email} required onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Age</label>
                    <div className="col-sm-10">
                         <input name="age" type="text" className="form-control" value={this.state.age} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">House</label>
                    <div className="col-sm-10">
                        <select className="form-control" name="house" value={this.state.house} onChange={this.handleChange}>
                            {
                                houses.map(house => (
                                    <option value={house.name} key={house.id}>{house.name}</option>
                                ))

                            }
                        </select>
                    </div>
                </div>
                 <div className="form-group">
                     <label className="col-sm-2 control-label">Course</label>
                     <div className="col-sm-10">
                         <select className="form-control" name="course" onChange={this.handleChange}>
                             {
                                 courses.map(course => (
                                     <option value={course.id} key={course.id}>{course.name}</option>
                                 ))
                             }
                         </select>
                     </div>
                 </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Gender</label>
                    <div className="col-sm-10">
                        <select name="gender" className="form-control" value={this.state.gender} onChange={this.handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
                 <div className="form-group">
                    <div className="col-sm-10">
                    <label className="col-sm-2 control-label">Add: </label>
                        <input type="radio" name="dbtable" value="student" onChange={this.handleChange}/> Student
                        <input type="radio" name="dbtable" value="instructor" onChange={this.handleChange}/> Instructor <br/>
                    </div>
                </div>
                 <div className="col-sm-offset-2 col-sm-10">
                     <button type="submit" className="btn btn-primary">submit</button>
                 </div>
            </section>

            </form>
            </div>
        )
    }
}
