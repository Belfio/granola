import { StyleSheet, Text, View } from "react-native";
import colours from "../constants/colours";

export default function HomePastEvents() {
  return (
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
  );
}

const styles = StyleSheet.create({
  textGrey: {
    color: "#6E7A91",
  },
  body: {
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    color: "#18181B",
    width: "100%",
    padding: 20,
    flex: 1,
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
    backgroundColor: colours.lightprimary,
  },
});
