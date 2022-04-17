import PropTypes from "prop-types";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import RNModal from "react-native-modal";
import ThemeContext from "../Theme/ThemeContext";

export default function Dialog({ children, isOpen, onRequestClose, style }) {
  const theme = useContext(ThemeContext);

  const backgroundColor = theme.colors?.background || "#fff";

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
      <View style={[styles.modal, { backgroundColor }, style]}>{children}</View>
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
    margin: 32,
    padding: 16,
    borderRadius: 2,
  },
});
