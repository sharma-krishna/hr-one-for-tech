import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Attendance from './containers/Attendance/index.js'
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import attendanceReducer from './containers/Attendance/reducer';
import rootSaga from './containers/Attendance/saga';
import { connect } from 'react-redux';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  attendanceReducer,
  applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store = {store}>
      <Attendance />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
