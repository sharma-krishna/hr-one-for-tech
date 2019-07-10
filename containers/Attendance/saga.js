import { put, takeLatest,all} from 'redux-saga/effects';
import {loadAttendance} from './action'

export function* getAllAttendance(){
    const data = [
        {
            'date': '2019-07-01',
            'day': 'mon',
            'punchIn': '09:32',
            'punchOut': '19:24',
        },
        {
            'date': '2019-07-02',
            'day': 'tues',
            'punchIn': '09:32',
            'punchOut': '19:24',
        },
        {
            'date': '2019-07-03',
            'day': 'wed',
            'punchIn': '11:32',
            'punchOut': '22:24',
        },
        {
            'date': '2019-07-04',
            'day': 'thurs',
            'punchIn': '09:32',
            'punchOut': '15:24',
        },
        {
            'date': '2019-07-05',
            'day': 'fri',
            'punchIn': '09:32',
            'punchOut': '17:24',
        },
        {
            'date': '2019-07-06',
            'day': 'sat',
            'punchIn': null,
            'punchOut': null,
        },
        {
            'date': '2019-07-07',
            'day': 'sun',
            'punchIn': null,
            'punchOut': null,
        },
        {
            'date': '2019-07-08',
            'day': 'mon',
            'punchIn': null,
            'punchOut': null,
        },
    ]
    yield put(loadAttendance(data));
}

function* actionWatcher() {
    yield takeLatest('ATTENDANCE', getAllAttendance)
}
export default function* rootSaga() {
  yield all([
  actionWatcher(),
  ]);
}

// yield takeLatest(ATTENDANCE,getAllAttendance)