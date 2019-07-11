import React from 'react';
import { Text, View } from 'react-native';


export class DetailBox extends React.Component{
    render() {
        return( 
            this.props.selectedDate.day == "sat" || this.props.selectedDate.day == "sun" ?
            <View>
                <Text> Weekend Off </Text>
            </View>
            :
            <View>
                <Text>Date: {this.props.selectedDate.date}</Text>
                <Text>Punch In: {this.props.selectedDate.punchIn == null ? "Didn't punch in" : this.props.selectedDate.punchIn}</Text>
                <Text>Punch Out: {this.props.selectedDate.punchOut == null ? "Didn't punch out" : this.props.selectedDate.punchOut}</Text>
            </View>
        );
    }
}

export default DetailBox;