// Node modules
import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
// Components
import { Text } from "../Themed";
import { LinkPressable } from "./CustomPressable";
import { Link } from "expo-router";

const CustomLink = ({
  onPress,
  onLongPress,
  title,
  iconLeft,
  iconRight,
  iconRightStyle,
  style,
  textStyle,
  disabled,
  loading,
}) => {
  return (
    <LinkPressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={[disabled ? styles.disabledLink : style, { flexDirection: 'row' }]}
    >
      <Text>{iconLeft}</Text>
      {loading ? (
        <ActivityIndicator color='#454545' />
      ) : (
        <Text style={[styles.linkText, textStyle]}>{title}</Text>
      )}
      <Text style={[iconRightStyle, {alignSelf: 'center'}]}>{iconRight}</Text>
    </LinkPressable>
  );
};

const styles = StyleSheet.create({
  disabledLink: {
    color: '#BDBDBD',
    textDecorationLine: 'line-through'
  },
  linkText: {
    color: "#454545",
  },
});

export default CustomLink;