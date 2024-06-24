import { StyleSheet, Text, View } from "react-native";
import Event, { EventType } from "./Event";

export default function EventList({ events }: { events: EventType[] | null }) {
  if (!events) {
    throw new Promise<void>((resolve) => setTimeout(() => resolve(), 2000)); // Simulate loading delay
  }
  return (
    <View>
      {events.length > 0 ? (
        events.map((event) => <Event key={event.id} event={event} />)
      ) : (
        <Text style={styles.textGrey}>No upcoming events</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textGrey: {
    color: "#6E7A91",
  },
});
