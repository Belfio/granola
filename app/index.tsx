import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import ButtonRecord from "./components/ButtonRecord";
import colours from "./constants/colours";
import HomeHeader from "./components/HomeHeader";
import HomePastEvents from "./components/HomePastEvents";

export default function App() {
  // check in localstorage if this is logged in, how does it work on expo?
  // checked in localstorage if the theme is dark or light
  // allow to change dark or light theme with context
  // fetch events from a fake db call
  // set a complex state using the reducer

  return (
    <>
      <HomeHeader />
      <HomePastEvents />
      <View style={styles.linkRecord}>
        <Link href="/record" asChild>
          <ButtonRecord />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textGrey: {
    color: "#6E7A91",
  },
  header: {
    backgroundColor: "#eeeff1",
    justifyContent: "flex-start",
    color: "#18181B",
    width: "100%",
    height: 184,
    padding: 20,
    paddingTop: 80,
  },
  headerBody: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  body: {
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    color: "#18181B",
    width: "100%",
    padding: 20,
    flex: 1,
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
  linkRecord: {
    position: "absolute",
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
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
