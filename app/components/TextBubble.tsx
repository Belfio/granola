import { StyleSheet, Text, View } from "react-native";
import colours from "../constants/colours";

export default function TextBubble({ text }: { text: React.ReactNode }) {
  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 12,
    backgroundColor: colours.secondary,
    padding: 8,
    marginBottom: 8,
    alignItems: "flex-start",
    justifyContent: "center",
    maxWidth: "80%",
  },
  text: {
    color: colours.white,
    fontWeight: "normal",
  },
});
