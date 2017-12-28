import {normalizeResponseErrors} from './utils';

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
        .then((newMember) => dispatch(addMemberSuccess(newMember)))
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
//this fetch protected data when succeed should get/display account by id and its members and tasks
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
    // const delayFetching = setTimeout((data) => dispatch(fetchProtectedDataSuccess(data)),5000);
    //const data;
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

export const addTask = (accId, memId, taskName, estimateTime, actualTime)=> (dispatch,getState) => {
    const authToken=getState().auth.authToken;
    return fetch(`/api/accounts/${accId}/members/${memId}/tasks`, {
        method: 'POST',
        body: JSON.stringify({accountId:accId,memId:memId,taskName:taskName,estimateTime:estimateTime,actualTime:actualTime}),
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json" 
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {console.log(res); return res.json()})
        .then(newTask => {
            console.log(newTask, 'this is inside addTask new task'); 
            dispatch(addTaskSuccess(newTask,memId))})
        .then(
            setTimeout( ()=>{
                dispatch(fetchProtectedData(accId))
            }
            ,1000))
        .catch(err => {
            dispatch(addTaskError(err));
        });
};
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const addTaskSuccess = (newTask,memId) => ({
    type: ADD_TASK_SUCCESS,
    newTask,
    memId
});

export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
export const addTaskError = error => ({
    type: ADD_TASK_ERROR,
    error
});
