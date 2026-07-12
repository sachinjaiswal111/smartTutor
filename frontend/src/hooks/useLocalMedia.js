import { useEffect, useState } from "react";

export const useLocalMedia = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let localStream;

    const startMedia = async () => {
      try {
        localStream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        setStream(localStream);
      } catch (error) {
        console.error(error);
      }
    };

    startMedia();

    return () => {
      if (localStream) {
        localStream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return stream;
};