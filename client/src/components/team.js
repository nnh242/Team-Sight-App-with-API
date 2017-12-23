import React from 'react';
import {connect} from 'react-redux';
import Member from './member';
import AddForm from './add-form';
import {addMember} from '../actions/protected-data';
import Chart from './chart';
import './team.css';

export class Team extends React.Component {
    addMemberHandler(name) {
        this.props.dispatch(addMember(this.props.accId,name));
    }

    render() {
        const members = this.props.members.map((member, index) =>
            <Member key={index} index={index} {...member} />
        );

        return (
            <div className="team">
                <h2>{this.props.name}</h2>
                <AddForm className="addForm" type="member" onAdd={name => this.addMemberHandler(name)} />
                <div className="members">
                    {members}
                </div>
                <Chart />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    members: state.protectedData.members,
    accId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(Team);