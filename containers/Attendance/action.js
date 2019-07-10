import {ATTENDANCE, SEND_ATTENDANCE} from './constant';

export function loadAttendance(data) {
  return {
    type: ATTENDANCE,
    data,
  };
}
export function sendAttendance(){
  console.log("in action send attendance")
  return {
    type: SEND_ATTENDANCE,
  };
}