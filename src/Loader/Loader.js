import Lottie from "lottie-react-native";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import LoaderDark from "./loader-dark.json";
import LoaderLight from "./loader-light.json";

export default function Loader({ style, type }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.reset();
      lottieRef.current.play();
    }
  }, []);

  const getSource = () => {
    if (type === "light") {
      return LoaderLight;
    } else if (type === "dark") {
      return LoaderDark;
    }
    return null;
  };

  const source = getSource();

  if (!source) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Lottie ref={lottieRef} source={source} />
      </View>
    </View>
  );
}

Loader.propTypes = {
  style: PropTypes.any,
  type: PropTypes.oneOf(["dark", "light"]),
};

Loader.defaultProps = {
  style: {},
  type: "dark",
};

const styles = StyleSheet.create({
  container: {
    margin: 32,
    alignItems: "center",
  },
  content: {
    width: 128,
    height: 128,
  },
});
