import {normalizeResponseErrors} from './utils';
import { authError } from './auth';

//export const ADD_MEMBER = 'ADD_MEMBER';

export const addMember = (accId, name) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`/api/accounts/${accId}/members`, {
        method: 'POST',
        body: JSON.stringify({accountId:accId,name:name}),
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json" 
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((newMember) => 
        { console.log(newMember);
            dispatch(addMemberSuccess(newMember))})
        .catch(err => {
            dispatch(addMemberError(err));
        });
};
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const addMemberSuccess = newMember => ({
    type: ADD_MEMBER_SUCCESS,
    newMember
});

export const ADD_MEMBER_ERROR = 'ADD_MEMBER_ERROR';
export const addMemberError = error => ({
    type: ADD_MEMBER_ERROR,
    error
});

//export const ADD_TASK = 'ADD_TASK';
/* export const addTask = (text, memberIndex,estimateTime,actualTime) => ({
    type: ADD_TASK,
    text,
    estimateTime,
    actualTime,
    memberIndex
}); */
//ACCOUNT = PROTECTED_DATA
export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = (accId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`/api/accounts/${accId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
export const fetchMemberData = (accId,memId)=> (dispatch,getState) => {
    const authToken=getState().auth.authToken;
    console.log(authToken);
    return fetch(`/api/acounts/${accId}/members`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({member}) => dispatch(fetchMemberSuccess(member)))
        .catch(err => {
            dispatch(fetchMemberError(err));
        });
};
export const FETCH_MEMBER_SUCCESS = 'FETCH_MEMBER_SUCCESS';
export const fetchMemberSuccess = member => ({
    type: FETCH_MEMBER_SUCCESS,
    member
});

export const FETCH_MEMBER_ERROR = 'FETCH_MEMBER_ERROR';
export const fetchMemberError = error => ({
    type: FETCH_MEMBER_ERROR,
    error
});
export const addTask = (accId, memId,text, memberIndex,estimateTime,actualTime)=> (dispatch,getState) => {
    const authToken=getState().auth.authToken;
    console.log(authToken);
    return fetch(`/api/acounts/${accId}/members/${memId}/tasks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({task}) => dispatch(addTaskSuccess(task)))
        .catch(err => {
            dispatch(addTaskError(err));
        });
};
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const addTaskSuccess = task => ({
    type: ADD_TASK_SUCCESS,
    task
});

export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
export const addTaskError = error => ({
    type: ADD_TASK_ERROR,
    error
});
export const fetchTaskData = (accId,memId)=> (dispatch,getState) => {
    const authToken=getState().auth.authToken;
    console.log(authToken);
    return fetch(`/api/acounts/${accId}/members/${memId}/tasks`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({task}) => dispatch(fetchTaskSuccess(task)))
        .catch(err => {
            dispatch(fetchTaskError(err));
        });
};
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const fetchTaskSuccess = task => ({
    type: FETCH_TASK_SUCCESS,
    task
});

export const FETCH_TASK_ERROR = 'FETCH_TASK_ERROR';
export const fetchTaskError = error => ({
    type: FETCH_TASK_ERROR,
    error
});