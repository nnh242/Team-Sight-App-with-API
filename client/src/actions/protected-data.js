import {normalizeResponseErrors} from './utils';
export const ADD_MEMBER = 'ADD_MEMBER';
export const addMember = name => ({
    type: ADD_MEMBER,
    name
});

export const ADD_TASK = 'ADD_TASK';
export const addTask = (text, memberIndex) => ({
    type: ADD_TASK,
    text,
    memberIndex
});
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
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
