import { Audio } from "expo-av";
import { useState } from "react";
import { S3 } from "aws-sdk";
import { Error } from "aws-sdk/clients/s3";
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;
const BUCKET_NAME = process.env.BUCKET_NAME;

// Initialize AWS S3
const s3 = new S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

export default function useUpload() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  console.log("Process.env", BUCKET_NAME, {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });
  const uploadAudioToS3 = async (audioUri: string, audioName: string) => {
    if (audioUri) {
      const response = await fetch(audioUri);
      const blob = await response.blob();
      const key = `uploads/${audioName}-${Date.now()}.m4a`;

      const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: blob,
        ContentType: "audio/m4a",
      };

      s3.upload(params)
        .promise()
        .then((data: S3.ManagedUpload.SendData) => {
          console.log("Successfully uploaded audio: ", data.Location);
        })
        .catch((err: Error) => {
          console.log("Error uploading audio: ", err);
        });
    }
  };

  // Expose stopRecordingAndUpload, along with any other functions or states your component needs
  return { uploadAudioToS3 /* other states and functions */ };
}
