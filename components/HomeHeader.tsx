import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import colours from "../constants/colours";
import { Suspense, lazy, useEffect, useState } from "react";
import Event, { EventType } from "./Event";
import EventList from "./EventList";

class EventClass {
  date: string;
  name: string;
  time: string;
  id: number;

  constructor(date: string, name: string, time: string, id: number) {
    this.date = date;
    this.name = name;
    this.time = time;
    this.id = id;
  }
}

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

  const addEvent = (id: number) => {
    const event = new EventClass(
      "Nuovo 10 June",
      "Meeting with the team",
      "10:00 AM",
      id
    );
    setUpcomingEvents((el) => {
      if (el) {
        return [event, ...el];
      }
      return [event];
    });
  };

  const handleClick = () => {
    console.log("click");
    addEvent(Math.floor(Math.random() * 1000));
  };

  const cancelEvent = (id: number) => {
    console.log("cancel", id);
    setUpcomingEvents((el) => {
      if (el) {
        return el.filter((e) => e.id !== id);
      }
      return el;
    });
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Coming up</Text>
      <View style={styles.headerBody}>
        <Pressable onPress={handleClick} style={styles.addButton}>
          <Text>+</Text>
        </Pressable>
        <Suspense fallback={<Text>Loading...</Text>}>
          <EventList
            events={upcomingEvents}
            cancelEvent={cancelEvent}
            eventsNumber={upcomingEvents?.length || 0}
          />
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
    height: 224,
    padding: 20,
    paddingTop: 80,
  },
  headerBody: {
    alignItems: "flex-start",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#18181B",
  },
  addButton: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    zIndex: 10,
  },
});
