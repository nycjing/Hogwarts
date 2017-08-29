import { combineReducers } from 'redux'
// import axios from 'axios';

// ACTION TYPES
import axios from 'axios';

// ACTION TYPES

const GET_HOUSES = 'GET_HOUSES';

const initialState = {
    houses: []
};

export function fetchHouses () {
    return function thunk (dispatch) {
        return axios.get('/api/')
            .then(res => res.data.houses)
            .then(houses => {
                dispatch(gotHousesFromServer(houses))
            });
    };
};

export function gotHousesFromServer (houses) {
    return {
        type: GET_HOUSES,
        houses
    };
}

const rootReducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_HOUSES:
            return Object.assign({}, state, {houses: action.houses});
        default: return state
    }
};

export default rootReducer
