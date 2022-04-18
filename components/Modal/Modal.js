import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Keyboard, Platform, ScrollView, StyleSheet, View } from "react-native";
import RNModal from "react-native-modal";
import { useScreenSize } from "../../hooks";
import ThemeContext from "../Theme/ThemeContext";

export default function Modal({
  children,
  footer,
  header,
  isOpen,
  onRequestClose,
  style,
}) {
  const theme = useContext(ThemeContext);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const screenSize = useScreenSize();

  useEffect(() => {
    const keyboardShow = (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    };

    const keyboardHide = () => {
      setKeyboardHeight(0);
    };

    const willShow = Keyboard.addListener("keyboardWillShow", keyboardShow);
    const willHide = Keyboard.addListener("keyboardWillHide", keyboardHide);
    const didShow = Keyboard.addListener("keyboardDidShow", keyboardShow);
    const didHide = Keyboard.addListener("keyboardDidHide", keyboardHide);

    return () => {
      willShow?.remove();
      willHide?.remove();
      didShow?.remove();
      didHide?.remove();
    };
  }, []);

  // Note that we need different behaviour on android/iOS since RNModal
  // behaves differently on each of the platforms.
  const maxHeight = Platform.select({
    android: (screenSize?.height - keyboardHeight) * 0.8,
    ios: screenSize?.height * 0.8,
  });
  const paddingBottom = Platform.select({
    android: 0,
    ios: keyboardHeight > 0 ? keyboardHeight : screenSize?.bottomMargin,
  });
  const backgroundColor = theme?.color?.background || "#fff";
  // Need to set "keyboardShouldPersistTaps" on ScrollView to allow FlatList
  // being pressable within modal.
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
      <View
        style={[
          styles.modal,
          { backgroundColor, maxHeight, paddingBottom },
          style,
        ]}
      >
        {header}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        {footer}
      </View>
    </RNModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  header: PropTypes.node,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  style: PropTypes.any,
};

Modal.defaultProps = {
  children: null,
  footer: null,
  header: null,
  isOpen: false,
  onRequestClose: null,
  style: {},
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modal: {
    padding: 16,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
