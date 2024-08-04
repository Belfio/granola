import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import useUpload from "./useUpload";

const config = { CLOUD_FUNCTION_URL: "CLOUD_FUNCTION_URL" };

export default function useAudioRecord() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState<Audio.Sound | null>();
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string>("untitled");
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);
  const counterRef = useRef(0);
  const { uploadAudioToS3 } = useUpload();
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startRecording(isTranslating: boolean = false) {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      console.log("Starting recording..");

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      const uri = recording.getURI();

      setAudioUri(uri);
      console.log("Recording started");
      console.log("Recording uri", uri);
      if (isTranslating) {
        recordingInterval.current = setInterval(async () => {
          if (recording) {
            await recording.stopAndUnloadAsync();
            console.log("Recording stopped and stored");
            // Create a Blob from the local file URI and send it to the WebSocket
            const uri = recording.getURI();
            if (uri) uploadAudioToS3(uri, "oneSec" + counterRef.current);
            counterRef.current++;
            // Restart recording
            const { recording: newRecording } =
              await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HighQuality
              );
            setRecording(newRecording);
          }
        }, 1000);
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function playSound() {
    if (!audioUri) return;
    await loadSound(audioUri);
    if (!sound) return;
    await sound.playAsync();
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
    if (uri) uploadAudioToS3(uri, "prova");
    console.log("Recording stopped and stored at", uri);
    if (!uri) return;
    setAudioUri(uri);
  }

  async function loadSound(uri: string) {
    console.log("Loading sound..", uri);
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

  // create a function that takes the sound object and sends it to this API config.CLOUD_FUNCTION_URL,

  async function sendSound(sound: Audio.Sound) {
    const uri = await sound.getStatusAsync();
    const response = await fetch(config.CLOUD_FUNCTION_URL, {
      method: "POST",
      body: JSON.stringify({ uri }),
    });
    if (response.ok) {
      console.log("Sound sent successfully");
    } else {
      console.error("Failed to send sound");
    }
  }

  return {
    startRecording,
    stopRecording,
    playSound,
    unloadSound,
    recording,
    audioName,
    setAudioName,
    audioUri,
  };
}
