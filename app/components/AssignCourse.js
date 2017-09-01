import React from 'react';
import { connect } from 'react-redux';
import { assignCourseToStudent } from '../store';

function AssignCourse (props) {

    return (
        <form id="new-message-form" onSubmit={props.handleSubmit}>

            <div className="form-group">
                <label className="col-sm-2 control-label">Course</label>
                <div className="col-sm-9">
                    <select className="form-control" name="course">
                        {
                            props.courses.map(course => (
                                <option value={course.id} key={course.id}>{course.name}</option>
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
        courses: state.courses
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const course = +evt.target.course.value;
            const studentId = ownProps.student;
            console.log('send to backend data', studentId, course, typeof course, ownProps);
            dispatch(assignCourseToStudent(studentId, course));

        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignCourse);