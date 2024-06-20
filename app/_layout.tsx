import { Slot } from "expo-router";
import Footer from "../components/Footer";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function HomeLayout() {
  return (
    <View style={styles.container}>
      {/* <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer />
      </GestureHandlerRootView> */}
      <Slot />
      {/* <Footer /> */}
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
  },
});
