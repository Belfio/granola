import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import ButtonRecord from "@/components/ButtonRecord";
import TextBubble from "@/components/TextBubble";
import Separator from "@/components/Separator";
import colours from "@/constants/colours";
import useAudioRecord from "@/hooks/useRecording";
import useUpload from "@/hooks/useUpload";
import { useEffect } from "react";
import useSpeachToText from "@/hooks/useSpeachToText";
import useRTSTT from "@/hooks/useRTSTT";

const convo = [
  {
    id: 1,
    text: "Hi, Hello. This is a test message. of whateever viewo we want. This is a test message. of whateever viewo we want. This is a test message. of whateever viewo we want.",
  },
  {
    id: 2,
    text: "This is another test message.",
  },
  {
    id: 3,
    text: "This is a test message.",
  },
  {
    id: 4,
    text: "This is another test message.",
  },
  {
    id: 5,
    text: "This is a test message.",
  },
  {
    id: 6,
    text: "This is another test message.",
  },
  {
    id: 7,
    text: "This is a test message.",
  },
  {
    id: 8,
    text: "This is another test message.",
  },
  {
    id: 9,
    text: "This is a test message.",
  },
  {
    id: 10,
    text: "This is another test message.",
  },
  {
    id: 11,
    text: "This is a test message.",
  },
  {
    id: 12,
    text: "This is another test message.",
  },
  {
    id: 13,
    text: "This is a test message.",
  },
  {
    id: 14,
    text: "This is another test message.",
  },
  {
    id: 15,
    text: "This is a test message.",
  },
  {
    id: 16,
    text: "This is another test message.",
  },
  {
    id: 17,
    text: "This is a test message.",
  },
  {
    id: 18,
    text: "This is another test message.",
  },
  {
    id: 19,
    text: "This is a test message.",
  },
  {
    id: 20,
    text: "This is another test message.",
  },
];

export default function App() {
  const {
    recording,
    startRecording,
    stopRecording,
    playSound,
    audioName,
    setAudioName,
    audioUri,
  } = useAudioRecord();

  const { startTranscription, endTranscription, isRecording, transcript } =
    useRTSTT();

  const { uploadAudioToS3 } = useUpload();
  // useEffect(() => {
  //   startRecording();
  //   return () => {
  //     stopRecording();
  //   };
  // }, []);

  useEffect(() => {
    if (!audioUri) return;
    useSpeachToText(audioUri);
  }, [audioUri]);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Transcript</Text>
          {/* <Text style={styles.title}>{audioName}</Text> */}
          <Text style={styles.title}>{transcript}</Text>

          <Separator />
          <Button
            title={recording ? "Stop Recording" : "Start Recording"}
            onPress={recording ? endTranscription : startTranscription}
          />
          <Button title={"Suona"} onPress={playSound} />
          <View style={styles.convo}>
            {convo.map((item) => (
              <TextBubble text={item.text} key={item.id} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.linkRecord}>
        <Link href="/" asChild>
          <ButtonRecord active />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textGrey: {
    color: colours.darkgray,
  },
  body: {
    backgroundColor: colours.white,
    justifyContent: "flex-start",
    color: colours.black,
    width: "100%",
    padding: 20,
    paddingTop: 80,
  },
  linkRecord: {
    position: "absolute",
    bottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colours.black,
  },
  convo: {
    width: "100%",
    alignItems: "flex-end",
    height: "100%",
  },
});
