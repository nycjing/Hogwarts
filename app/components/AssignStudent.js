import React from 'react';
import { connect } from 'react-redux';
import { assignCourseToStudent } from '../store';

function AssignStudent (props) {

    return (
        <form id="new-message-form" onSubmit={props.handleSubmit}>

            <div className="form-group">
                <label className="col-sm-2 control-label">Add Student</label>
                <div className="col-sm-9">
                    <select className="form-control" name="student">
                        {
                            props.students.map(student => (
                                <option value={student.id} key={student.id}>{student.name}</option>
                            ))
                        }
                    </select>

                </div>
                <button className="btn btn-default col-sm-1" type="submit">+</button>
            </div>
        </form>
    );
}

const mapStateToProps = function (state, ownProps) {
    return {
        students: state.students
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const studentId = evt.target.student.value;
            const { course } = ownProps;
            console.log(studentId, course, typeof course);
             dispatch(assignCourseToStudent(studentId, course));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignStudent);