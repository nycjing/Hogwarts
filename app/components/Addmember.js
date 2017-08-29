import React from 'react';
import axios from 'axios';

export default class Addmember extends React.Component {
    constructor() {
        super();
        this.state = {
            name:   '',
            email:  '',
            age:    11,
            gender: '',
            classes: '',
            dbtable: '',
            house: '',
            houses: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/')
            .then(res => res.data)
            .then(data => this.setState({houses:data.houses}));
    }

    handleChange (evt) {
        const value = evt.target.value;
        this.setState({
            [evt.target.name]: value
        });
    }

    handleSubmit () {
        evt.preventDefault();
        const inputbody = this.state;
        console.log(inputbody);
        axios.post(`/api/`, {inputbody})
            .then(res => {
                console.log(res.data);
                return res.data
            })
            .then(data => {
                console.log('will be the input---', data);
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
            gender: '',
            classes: '',
            dbtable: '',
            house: '',
            houses: [],
        });
    }

    render() {
        const houses = this.state.houses;
        return (
            <div className="container">
                <h3>Add a member</h3>
                <h3>Add a member</h3>
            <form onSubmit={this.handleSubmit}>
             <section>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                        <input name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                        <input name="email" type="text" className="form-control" value={this.state.email} onChange={this.handleChange}/>
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
                                this.state.houses.map(house => (
                                    <option value={house.name} key={house.id}>{house.name}</option>
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
                    <label className="col-sm-2 control-label">Classes</label>
                    <div className="col-sm-10">
                        <input name="classes" type="text" className="form-control" value={this.state.classes} onChange={this.handleChange}/>
                    </div>
                </div>
                 <div className="form-group">
                    <div className="col-sm-10">
                    <label className="col-sm-2 control-label">Add: </label>
                        <input type="radio" name="dbtable" value="student" checked onChange={this.handleChange}/> Student
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
