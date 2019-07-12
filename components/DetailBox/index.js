import React from "react";
import PropTypes from "prop-types";

import { Modal, Text, Button, View } from "react-native";

export class DetailBox extends React.Component {
  state = {
    modalVisible: this.props.flag
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    this.props.changeActive();
  }

  modalContent =
    this.props.selectedDate.day == "sat" ||
    this.props.selectedDate.day == "sun" ? (
      <View>
        <Text> Weekend Off </Text>
      </View>
    ) : (
      <View>
        <Text>Date: {this.props.selectedDate.date}</Text>
        <Text>
          Punch In:{" "}
          {this.props.selectedDate.punchIn == null
            ? "Didn't punch in"
            : this.props.selectedDate.punchIn}
        </Text>
        <Text>
          Punch Out:{" "}
          {this.props.selectedDate.punchOut == null
            ? "Didn't punch out"
            : this.props.selectedDate.punchOut}
        </Text>
      </View>
    );

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              {this.modalContent}
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="Go Back"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
DetailBox.propTypes = {
  changeActive: PropTypes.func
};
export default DetailBox;
