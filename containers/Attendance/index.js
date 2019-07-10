import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import {LocaleConfig, Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from './style.js';
import {present, absent, halfDay, workOff, FULL_DAY_TIME, HALF_DAY_TIME, WORK_OFF_DAYS} from './constant'
import { connect } from 'react-redux';
import {loadAttendance} from './action';
import { compose } from 'redux';

LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  dayNamesShort: ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'],
};
LocaleConfig.defaultLocale = 'en';


export const Attendance = ({attendance}) => {
    // console.log("I am here in app above loadAttendence")
    // loadAttendance(attendance);
    // console.log('i want to print attendance',attendance)
    
    const getWorkTime = (day)=>{
      console.log("in get work time");
      if(day['punchIn'] !== null && day['punchOut'] !== null){
        return (parseInt(day['punchOut'].split(":")[0]*60)+parseInt(day['punchOut'].split(":")[1]))-(parseInt((day['punchIn'].split(":")[0]*60))+parseInt(day['punchIn'].split(":")[1]))
      }
      else if (WORK_OFF_DAYS.includes(day['day'])){
        return Infinity
      }
      else{
        return 0;
      }
    }
     
    let attendenceMarkObject = {}
    const addAttendence = () =>{
      console.log("in add attendance")
      console.log(attendance)
      attendance.forEach(day =>{
        let employeeWorkTime = getWorkTime(day)

        if(employeeWorkTime === Infinity){
          attendenceMarkObject = {...attendenceMarkObject,[day['date']]:workOff}
        }
        else if(employeeWorkTime >= FULL_DAY_TIME){
          attendenceMarkObject = {...attendenceMarkObject,[day['date']]:present}
        }
        else if (employeeWorkTime >= HALF_DAY_TIME && employeeWorkTime < FULL_DAY_TIME){
          attendenceMarkObject = {...attendenceMarkObject,[day['date']]:halfDay}
        }
        else {
          attendenceMarkObject = {...attendenceMarkObject,[day['date']]:absent}
        }
      })
      return attendenceMarkObject;
    }
    return(
        <View style = {styles.container}>
            <Calendar
                currentDate={Date()}
                minDate={'2019-07-01'}
                onDayPress={(day) => {console.log('selected day', day)}}
                onDayLongPress={(day) => {console.log('selected day', day)}}
                onMonthChange={(month) => {console.log('month changed', month)}}
                hideArrows={false}
                hideExtraDays={true}
                disableMonthChange={true}
                markedDates={addAttendence()}
                firstDay={1}
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}
            />
        </View>
    );
}

// Attendance.propTypes = {
//   attendance: PropTypes.object,
// };

const mapStateToProps = (state) => ({
    attendance:state.attendance,
})

const mapDispatchToProps = function (dispatch) {
    return {
        loadAttendance:(attendance) => dispatch(loadAttendance(attendance)),
    }
  }

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
  
// Attendance=connect(mapStateToProps,null)(Attendance);
// Attendance=connect(null,mapDispatchToProps)(Attendance);
export default compose(
  withConnect,
)(Attendance);