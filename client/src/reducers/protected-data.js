import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    ADD_TASK_SUCCESS,
    ADD_TASK_ERROR,
    ADD_MEMBER_ERROR,
    ADD_MEMBER_SUCCESS,
    DELETE_MEMBER
} from '../actions/protected-data';

const initialState = {
    data: '',
    error: null,
    members: [{
        name: 'Example member 1',
        tasks: [{
            text: 'Example task 1',
            estimateTime: 12,
            actualTime: 16
        }, {
            text: 'Example task 2',
            estimateTime: 1,
            actualTime: 6
        }]
    }]
}

export default function reducer(state = initialState, action) {
    switch (action.type){
        case FETCH_PROTECTED_DATA_SUCCESS:
        return Object.assign({}, state, {
            data: action.data,
            members: action.data.members,
            error: null
        });
        case FETCH_PROTECTED_DATA_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
        case ADD_MEMBER_SUCCESS:
        return Object.assign({}, state, {
            members: [...state.members, {
                accountId: action.newMember.accountId,
                name: action.newMember.name,
                tasks: []
            }]
        });
        case ADD_MEMBER_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
        case DELETE_MEMBER:
        return Object.assign({},state,{
            members:[...state.members]
        })
        case ADD_TASK_SUCCESS:
        let members = state.members.map((member, index) => {
            if (member.id !== action.memId) {
                return member;
            }
            let newState= Object.assign({}, member, {
                tasks: [...member.tasks, {
                    taskName: action.newTask.taskName,
                    estimateTime:action.newTask.estimateTime,
                    actualTime: action.newTask.actualTime
                }]
            });
            return newState;
        });
        return Object.assign({},state,{
            members
        })
        case ADD_TASK_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
        default: return state;
    }

}
