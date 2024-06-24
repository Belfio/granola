import { Pressable, StyleSheet, Text, View } from "react-native";
import colours from "../app/constants/colours";

export default function Separator() {
  return <View style={styles.sep} />;
}

const styles = StyleSheet.create({
  sep: {
    width: "100%",
    height: 1,
    backgroundColor: colours.gray,
    marginVertical: 20,
  },
});
