import { AssemblyAI } from "assemblyai";
import { useState, useEffect } from "react";
const client = new AssemblyAI({
  apiKey: "da8a0b3c18b24e8890c060d3e1bdd550",
});

export default function useSpeachToText(uri: String) {
  const [transcript, setTranscript] = useState<string | null>(null);
  useEffect(() => {
    run();
  }, [uri]);
  const run = async () => {
    const config = {
      audio_url: uri,
    };
    const transcript = await client.transcripts.transcribe(config);
    console.log(transcript.text);
    setTranscript(transcript.text);
  };

  return { transcript };
}
