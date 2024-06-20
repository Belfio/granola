import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.element}>
        <Text>Meetings</Text>
      </View>
      <View style={styles.element}>
        <Text>Settings</Text>
      </View>
      <View style={styles.element}>
        <Text>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    color: "#18181B",
    width: "100%",
    padding: 20,
  },
  element: {
    backgroundColor: "#fff",
    color: "#18181B",
    padding: 20,
  },
});
