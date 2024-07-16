import { View, Text, StyleSheet, Pressable } from "react-native";
import colours from "../constants/colours";
export type EventType = {
  date: string;
  name: string;
  time: string;
  id: number;
};
export default function Event({
  event,
  small,
  onPress,
}: {
  event: EventType;
  small: boolean;
  onPress?: (id: number) => void;
}): React.ReactNode {
  return (
    <Pressable onPress={() => onPress && onPress(event.id)}>
      <View>
        {!small && <Text style={styles.title}>{event.date}</Text>}
        <View style={styles.event}>
          <View style={styles.eventIcon}></View>
          <View>
            <Text>{event.name}</Text>
            <Text style={styles.textGrey}>
              {small && `${event.date} @`}
              {event.time}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
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
