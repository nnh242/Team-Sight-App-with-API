import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_MEMBER_SUCCESS,
    FETCH_MEMBER_ERROR,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_ERROR,
    ADD_TASK_SUCCESS,
    ADD_TASK_ERROR,
    ADD_MEMBER_ERROR,
    ADD_MEMBER_SUCCESS
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
        console.log(action);
        return Object.assign({}, state, {
            data: action.data,
            members:action.data.members,
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
        case FETCH_MEMBER_SUCCESS:
        return Object.assign({}, state, {
            members: action.members,
            error: null
        });
        case FETCH_MEMBER_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
        case ADD_TASK_SUCCESS:
        let members = state.members.map((member, index) => {
            if (index !== action.memberIndex) {
                return member;
            }
            //TODO: add estimates and actual times as well.. how do i do that
            return Object.assign({}, member, {
                tasks: [...member.tasks, {
                    text: action.text,
                    estimateTime:action.estimateTime,
                    actualTime: action.actualTime,
                    memId: action.memId,
                    accountId: action.accountId
                }]
            });
        });
        case ADD_TASK_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
        case FETCH_TASK_SUCCESS:
        return Object.assign({}, state, {
            task: action.task,
            error: null
        });
        case FETCH_TASK_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
        break;
        default: return state; 
    }
       
}
