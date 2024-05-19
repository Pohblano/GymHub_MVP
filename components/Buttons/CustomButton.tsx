// Node modules
import React from "react";
import {StyleSheet, ActivityIndicator} from "react-native";
// Components
import { Text } from "../Themed";
import {ButtonPressable} from "./CustomPressable";

const CustomButton = ({
  onPress,
  onLongPress,
  title,
  iconLeft,
  iconRight,
  style,
  textStyle,
  disabled,
  activeOpacity,
  loading,
  width
}) => {
  return (
    <ButtonPressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[disabled ? styles.disabledButton : {width: width}, styles.button, style]}
    >
      <Text>{iconLeft}</Text> 
      {loading ? (
        <ActivityIndicator color='#454545' />
      ) : (
        <Text style={[textStyle]}>{title}</Text>
      )}
	  {/* <Text style={[styles.buttonText, textStyle]}>{title}</Text> */}

     <Text>{iconRight}</Text> 
    </ButtonPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#42a5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  disabledButton: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default CustomButton;