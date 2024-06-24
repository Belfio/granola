import { StyleSheet, Text, View } from "react-native";
import colours from "../constants/colours";
import { Suspense, lazy, useEffect, useState } from "react";
import Event, { EventType } from "./Event";
import EventList from "./EventList";

export default function HomeHeader() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[] | null>(
    null
  );
  useEffect(() => {
    const fetchData = () => {
      setUpcomingEvents(futureEvents);
    };
    setTimeout(() => fetchData(), 2000); // Simulate loading delay
    // load future events when rendered the first time
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Coming up</Text>
      <View style={styles.headerBody}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <EventList events={upcomingEvents} />
        </Suspense>
      </View>
    </View>
  );
}

const futureEvents: EventType[] = [
  {
    id: 1,
    date: "Monday 10 June",
    name: "Meeting with the team",
    time: "10:00 AM",
  },
  {
    id: 2,
    date: "Tuesday 11 June",
    name: "Meeting with the team",
    time: "10:00 AM",
  },
  {
    id: 3,
    date: "Wednesday 12 June",
    name: "Meeting with the team",
    time: "10:00 AM",
  },
  {
    id: 4,
    date: "Thursday 13 June",
    name: "Meeting with the team",
    time: "10:00 AM",
  },
  {
    id: 5,
    date: "Friday 14 June",
    name: "Meeting with the team",
    time: "10:00 AM",
  },
  {
    id: 6,
    date: "Saturday 15 June",
    name: "Meeting with the team",
    time: "10:00 AM",
  },
  {
    id: 7,
    date: "Sunday 16 June",
    name: "Meeting with the team",
    time: "10:00 AM",
  },
];
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#18181B",
    fontFamily: "Helvetica Neue",
  },
});
