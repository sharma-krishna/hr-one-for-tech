import {ATTENDANCE, SEND_ATTENDANCE} from './constant';

export const initialState = {
    attendance : [],
};

export default function attendanceReducer(state = initialState, action){
    switch(action.type){
        case ATTENDANCE:{
            return {...state,attendance: action.data}
        }
        default:
            return state;
    }
}