import "./App.css";
import { useRef, useState } from "react";
import { RealtimeTranscriber } from "assemblyai/streaming";
import { mediaDevices } from "react-native-webrtc";
import * as RecordRTC from "recordrtc";

export default function useRTSTT() {
  /** @type {React.MutableRefObject<RealtimeTranscriber>} */
  const realtimeTranscriber = useRef(null);
  /** @type {React.MutableRefObject<RecordRTC>} */
  const recorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const getToken = async () => {
    const response = await fetch(
      "https://0qujodd4w6.execute-api.us-east-1.amazonaws.com/token"
    );
    const data = await response.json();

    if (data.error) {
      alert(data.error);
    }

    return data.token;
  };

  const startTranscription = async () => {
    realtimeTranscriber.current = new RealtimeTranscriber({
      token: await getToken(),
      sampleRate: 16_000,
    });
    if (!realtimeTranscriber.current) return;

    const texts = {};

    realtimeTranscriber.current.on("transcript", (transcript) => {
      let msg = "";
      texts[transcript.audio_start] = transcript.text;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts[key]) {
          msg += ` ${texts[key]}`;
          console.log(msg);
        }
      }
      setTranscript(msg);
    });

    realtimeTranscriber.current.on("error", (event) => {
      console.error(event);
      realtimeTranscriber.current.close();
      realtimeTranscriber.current = null;
    });

    realtimeTranscriber.current.on("close", (code, reason) => {
      console.log(`Connection closed: ${code} ${reason}`);
      realtimeTranscriber.current = null;
    });

    await realtimeTranscriber.current.connect();

    mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        recorder.current = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm;codecs=pcm",
          recorderType: RecordRTC.StereoAudioRecorder,
          timeSlice: 250,
          desiredSampRate: 16000,
          numberOfAudioChannels: 1,
          bufferSize: 4096,
          audioBitsPerSecond: 128000,
          ondataavailable: async (blob) => {
            if (!realtimeTranscriber.current) return;
            const buffer = await blob.arrayBuffer();
            realtimeTranscriber.current.sendAudio(buffer);
          },
        });
        recorder.current.startRecording();
      })
      .catch((err) => console.error(err));

    setIsRecording(true);
  };

  const endTranscription = async (event) => {
    event.preventDefault();
    setIsRecording(false);

    await realtimeTranscriber.current.close();
    realtimeTranscriber.current = null;

    recorder.current.pauseRecording();
    recorder.current = null;
  };

  return {
    startTranscription,
    endTranscription,
    isRecording,
    transcript,
  };
}
