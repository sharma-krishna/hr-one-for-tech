import {ATTENDANCE, SEND_ATTENDANCE} from './constant';

export const initialState = {
    attendance : [],
};

export default function attendanceReducer(state = initialState, action){
    switch(action.type){
        case ATTENDANCE:{
            console.log("in reducer")
            // return state.set(action.data)
            return {...state,attendance: action.data}
        }
        // case SEND_ATTENDANCE:{
        //     console.log("in send attendance")
        //     return {...state,attendance:action.data}
        // }
        default:
            return state;
    }
}