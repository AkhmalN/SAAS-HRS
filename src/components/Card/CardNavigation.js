import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { navigationItems } from "../../constant/navigation";
import { theme } from "../../constant/color";

const CardNavigation = () => {
  const navigation = useNavigation();
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.secondaryTextColor }]}>
        Office Service
      </Text>
      <View style={styles.contentBanner}>
        {navigationItems.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            style={styles.iconContainer}
            onPress={() => handleNavigation(item.onScreen)}
          >
            <View style={styles.touchableContent}>
              <View style={styles.iconFeatures}>{item.icon}</View>
              <Text
                style={[
                  styles.labelFeatures,
                  { color: theme.secondaryTextColor },
                ]}
              >
                {item.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default CardNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
  },
  title: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  contentBanner: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  iconFeatures: {
    width: "80%",
    height: 70,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f6",
    padding: 6,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 5, // Adjust as needed
  },
  touchableContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
  },
  labelFeatures: {
    textAlign: "center",
    fontSize: 16,
  },
});
