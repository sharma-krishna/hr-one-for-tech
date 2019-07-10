import {ATTENDANCE} from './constant';

export const initialState = {
    attendance : [],
};

export default function attendanceReducer(state = initialState, action){
    switch(action.type){
        case ATTENDANCE:{
            console.log("in reducer")
            console.log(action.data)
            return state.set('attendance', action.data);
        }
        default:
            return state;
    }
}