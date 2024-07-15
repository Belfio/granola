import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colours from "../constants/colours";
import { forwardRef } from "react";

const ButtonRecord = forwardRef(
  (
    {
      active,
      onPress,
    }: { active?: boolean; onPress?: (e: GestureResponderEvent) => void },
    ref
  ) => (
    <Pressable
      ref={ref as React.RefObject<View>}
      style={styles.buttonStart}
      onPress={onPress}
    >
      {active ? (
        <>
          <View
            style={{
              ...styles.voiceLine,
              height: 24,
              backgroundColor: colours.primary,
            }}
          />
          <View
            style={{
              ...styles.voiceLine,
              height: 32,
              backgroundColor: colours.primary,
            }}
          />
          <View
            style={{
              ...styles.voiceLine,
              height: 26,
              backgroundColor: colours.primary,
            }}
          />
        </>
      ) : (
        <>
          <View
            style={{
              ...styles.voiceLine,
              height: 18,
              backgroundColor: colours.darkgray,
            }}
          />
          <View
            style={{
              ...styles.voiceLine,
              height: 32,
              backgroundColor: colours.darkgray,
            }}
          />
          <View
            style={{
              ...styles.voiceLine,
              height: 24,
              backgroundColor: colours.darkgray,
            }}
          />
        </>
      )}
    </Pressable>
  )
);

export default ButtonRecord;

const styles = StyleSheet.create({
  buttonStart: {
    borderRadius: 50,
    backgroundColor: "#fff",
    borderColor: colours.gray,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 10,
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colours.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  voiceLine: {
    width: 4,
    height: 20,
    backgroundColor: colours.darkgray,
    borderRadius: 2,
  },
});
