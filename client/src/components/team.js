import React from 'react';
import {connect} from 'react-redux';

import Member from './member';
import AddForm from './add-form';

import {addMember} from '../actions/protected-data';

import './team.css';

export class Team extends React.Component {
    addMember(name) {
        this.props.dispatch(addMember(name));
    }

    render() {
        const members = this.props.members.map((member, index) =>
            <Member key={index} index={index} {...member} />
        );

        return (
            <div className="team">
                <h2>{this.props.name}</h2>
                <div className="members">
                    {members}
                    <AddForm type="member" onAdd={name => this.addMember(name)} />
                </div>
            </div>
        );
    }
}

Team.defaultProps = {
    name: 'My Team'
};

const mapStateToProps = state => ({
    members: state.protectedData.members
});

export default connect(mapStateToProps)(Team);