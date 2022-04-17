import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

export default function DevButton({ children, onSuccess, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= trigger && onSuccess) {
      onSuccess();
    }
  }, [count]);

  const onPress = () => setCount(count + 1);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
}

DevButton.propTypes = {
  children: PropTypes.any,
  onSuccess: PropTypes.func,
  trigger: PropTypes.number,
};

DevButton.defaultProps = {
  children: null,
  onSuccess: null,
  trigger: 7,
};
