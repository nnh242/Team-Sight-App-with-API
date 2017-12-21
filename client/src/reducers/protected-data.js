import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    ADD_TASK,
    ADD_MEMBER
} from '../actions/protected-data';

const initialState = {
    data: '',
    error: null,
    members: [{
        name: 'Example member 1',
        tasks: [{
            text: 'Example task 1',
            estimateTime: 12 + ' hr(s)',
            actualTime: 16 + ' hr(s)'
        }, {
            text: 'Example task 2',
            estimateTime: 1 + ' hr(s)',
            actualTime: 6 + ' hr(s)'
        }]
    }]
}

export default function reducer(state = initialState, action) {
    switch (action.type){
        case FETCH_PROTECTED_DATA_SUCCESS:
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
        case FETCH_PROTECTED_DATA_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
        case ADD_MEMBER:
        return Object.assign({}, state, {
            members: [...state.members, {
                name: action.name,
                tasks: []
            }]
        });
        case ADD_TASK:
        let members = state.members.map((member, index) => {
            if (index !== action.memberIndex) {
                return member;
            }
            return Object.assign({}, member, {
                tasks: [...member.tasks, {
                    text: action.text
                }]
            });
        });
        break;
        default: 
        return state; 
    }
       
}
