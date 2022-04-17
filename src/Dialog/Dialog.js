import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import RNModal from "react-native-modal";

export default function Dialog({ children, isOpen, onRequestClose, style }) {
  return (
    <RNModal
      style={styles.container}
      coverScreen={true}
      isVisible={isOpen}
      swipeDirection="down"
      onBackButtonPress={onRequestClose}
      onBackdropPress={onRequestClose}
      onSwipeComplete={onRequestClose}
      propagateSwipe
    >
      <View style={[styles.modal, style]}>{children}</View>
    </RNModal>
  );
}

Dialog.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  style: PropTypes.any,
};

Dialog.defaultProps = {
  children: null,
  isOpen: false,
  onRequestClose: null,
  style: {},
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 0,
  },
  modal: {
    backgroundColor: "#fff",
    margin: 32,
    padding: 16,
    borderRadius: 2,
  },
});
