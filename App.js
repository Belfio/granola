import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coming up</Text>
        <View style={styles.headerBody}>
          <Text style={styles.textGrey}>No upcoming events</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Monday 10 June</Text>
        <View style={styles.event}>
          <View style={styles.eventIcon}></View>
          <View>
            <Text>Meeting with the team</Text>
            <Text style={styles.textGrey}>10:00 AM</Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
      <Pressable style={styles.buttonStart}>O</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    fontFamily: "Helvetica Neue",
    color: "#18181B",
    width: "100%",
    height: "100%",
    paddingBottom: 20,
    paddingTop: 20,
    fontWeight: "bold",
  },
  textGrey: {
    color: "#6E7A91",
  },
  header: {
    backgroundColor: "#eeeff1",
    alignItems: "left",
    justifyContent: "left",
    color: "#18181B",
    width: "100%",
    height: 184,
    padding: 20,
  },
  headerBody: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  body: {
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "left",
    color: "#18181B",
    width: "100%",
    padding: 20,
  },
  buttonStart: {
    position: "absolute",
    bottom: 20,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderColor: "#d4d4d4",
    borderWidth: 2,
    borderStyle: "solid",
    padding: 10,
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#18181B",
    fontFamily: "Helvetica Neue",
  },
  event: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#FFC700",
  },
});