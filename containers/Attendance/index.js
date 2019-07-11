import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import {LocaleConfig, Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from './style.js';
import {present, absent, halfDay, workOff, FULL_DAY_TIME, HALF_DAY_TIME, WORK_OFF_DAYS} from './constant'
import { connect } from 'react-redux';
import {loadAttendance, sendAttendance} from './action';
import { compose } from 'redux';
import DetailBox from '../../components/DetailBox';

LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  dayNamesShort: ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'],
};
LocaleConfig.defaultLocale = 'en';


export class Attendance extends Component{
    componentDidMount() {
      this.props.sendAllAttendance();
    }

    state = {
      active: false,
      day: []
    }
    
    render(){
      const getWorkTime = (day)=>{
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
        this.props.attendance.forEach(day =>{
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

      const handlePress = (day) => {
        console.log(day)
        const obj = this.props.attendance.filter(att => day.dateString == att.date)
        console.log(obj)
        this.setState(state => {
          state.active = true
          state.day = obj
          return state
        })
      }

      return(
        <View style = {styles.container}>
          <Calendar
            minDate={'2019-07-01'}
            maxDate = {Date()}
            onDayPress={(day) => handlePress(day)}
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

          {this.state.active ? (
            <DetailBox 
              selectedDate = {this.state.day[0]}
            />
          ) : null}

        </View>
      );
    }
}

Attendance.propTypes = {
  attendance: PropTypes.array,
  sendAllAttendance: PropTypes.func,
};

const mapStateToProps = (state) => ({
    attendance: state.attendance,
})

const mapDispatchToProps = function (dispatch) {
    return {
        sendAllAttendance: () => dispatch(sendAttendance()),
        loadAttendance: (attendance) => dispatch(loadAttendance(attendance)),
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