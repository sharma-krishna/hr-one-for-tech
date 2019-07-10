import {ATTENDANCE} from './constant';

export function loadAttendance(data) {
    return {
      type: ATTENDANCE,
      data,
    };
  }