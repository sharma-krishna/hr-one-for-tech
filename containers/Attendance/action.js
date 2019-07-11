import {ATTENDANCE, SEND_ATTENDANCE} from './constant';

export function loadAttendance(data) {
  return {
    type: ATTENDANCE,
    data,
  };
}
export function sendAttendance(){
  return {
    type: SEND_ATTENDANCE,
  };
}