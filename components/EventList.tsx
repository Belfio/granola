import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Event, { EventType } from "./Event";

export default function EventList({
  events,
  cancelEvent,
  eventsNumber,
}: {
  events: EventType[] | null;
  cancelEvent: (id: number) => void;
  eventsNumber: number;
}) {
  if (!events) {
    throw new Promise<void>((resolve) => setTimeout(() => resolve(), 2000)); // Simulate loading delay
  }
  return (
    <ScrollView style={{ width: "100%" }}>
      {events.length > 0 ? (
        events.map((event) => (
          <Pressable key={event.id}>
            <Event
              key={event.id}
              event={event}
              small={true}
              onPress={cancelEvent}
            />
          </Pressable>
        ))
      ) : (
        <Text style={styles.textGrey}>No upcoming events</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textGrey: {
    color: "#6E7A91",
  },
});
