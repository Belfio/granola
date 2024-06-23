import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export default function useAudioRecord() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState<Audio.Sound | null>();
  const [audioUri, setAudioUri] = useState<string | null>(null);
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  async function playSound() {
    console.log("Loading Sound");
    if (!audioUri) return;
    await loadSound(audioUri);
    if (!sound) return;

    console.log("Playing Sound");
    await sound.playAsync();
    console.log("Finished playing sound");
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    if (!recording) return;
    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    if (!uri) return;
    setAudioUri(uri);
  }

  async function loadSound(uri: string) {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri }, // Directly passing an object with uri
        { shouldPlay: true } // Optional parameters, customize as needed
      );
      // Your logic to handle the sound object
      setSound(sound);
      return sound;
    } catch (error) {
      console.error("Failed to load the sound", error);
      return null;
    }
  }

  async function unloadSound() {
    if (!sound) return;
    await sound.unloadAsync();
    setSound(null);
  }

  return { startRecording, stopRecording, playSound, unloadSound, recording };
}
