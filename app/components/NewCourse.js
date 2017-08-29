import React from 'react';
import { connect } from 'react-redux';
import { postCourse, writeCourse } from '../store';

function NewCourse (props) {

    const { newCourseEntry, handleChange, handleSubmit } = props;

    return (
        <form id="new-message-form" onSubmit={evt => handleSubmit( newCourseEntry, evt)}>
            <div className="input-group input-group-lg">
                <input
                    className="form-control"
                    type="text"
                    name="content"
                    value={newCourseEntry}
                    onChange={handleChange}
                />
                <span className="input-group-btn">
          <button className="btn btn-default" type="submit">Chat!</button>
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
        handleSubmit ( newCourseEntry, evt) {
            evt.preventDefault();

            const { courseId } = ownProps;

            dispatch(postCourse({ newCourseEntry, courseId }));
            dispatch(writeCourse(''));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCourse);