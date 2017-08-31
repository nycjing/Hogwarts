import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { assignCourseToMember } from '../store';

export class Editmember extends React.Component {


    componentDidMount() {
        const studentId = props.match.params.studentId;
        console.log(studentId)
    }

    render() {
        // const student = this.props.students.filter(student => student.id===props.match.params.studentId);
        // const instructors = props.instructors;
        // console.log(student, instructors)
        return (
            <div className="container">



            </div>
        )
    }
}


const mapStateToProps = function (state, ownProps) {
    return {
        courses: state.courses,
        students: state.students,
        instructors: state.instructors
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const newCourse = evt.target.course.value;
            const { memberId } = ownProps;
            dispatch(assignCourseToMember({ newCourse, memberId}));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editmember);