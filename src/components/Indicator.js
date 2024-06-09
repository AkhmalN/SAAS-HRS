// src/components/ProgressBar.js

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { theme } from "../constant/color";

const ProgressBar = ({ progress }) => {
  console.log(progress);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress.toFixed(0),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width }]}>
        <Text style={styles.progressText}>{`${progress}%`}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: theme.light,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: theme.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  progressText: {
    color: theme.light,
    fontWeight: "bold",
  },
});

export default ProgressBar;
