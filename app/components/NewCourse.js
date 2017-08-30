import React from 'react';
import { connect } from 'react-redux';
import { postCourseToServer, writeCourse } from '../store';

function NewCourse (props) {

    const { newCourseEntry, handleChange, handleSubmit } = props;

    return (
        <form id="new-message-form" onSubmit={props.handleSubmit}>
            <div className="input-group">
                <input
                    className="form-control"
                    type="text"
                    name="courseName"
                    value={newCourseEntry}
                    onChange={props.handleChange}
                />
                <span className="input-group-btn">
                <button className="btn btn-default" type="submit">Add Course</button>
                </span>
            </div>
        </form>
    );
}

const mapStateToProps = function (state, ownProps) {
    return {
        newCourseEntry: state.newCourseEntry,
        name: state.name
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleChange (evt) {
            dispatch(writeCourse(evt.target.value));
        },
        handleSubmit (evt) {
            evt.preventDefault();
            const newCourse = evt.target.courseName.value;
            const { courseId } = ownProps;
            dispatch(postCourseToServer({ newCourse}));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCourse);