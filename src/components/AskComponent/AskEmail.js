import React, { useEffect, useState } from "react";
import emailAudio from '../../audio/email.wav';
import { useReactMediaRecorder } from "react-media-recorder";
import { useDispatch } from "react-redux";
import { updateRec } from "../store/recording/recordingSlice";
import { transcriptionActions } from "../store/transcription/transcriptionSlice";
import sendToTranscribe from "../../API/transcribeAPI";

function AskEmail() {
  const dispatch = useDispatch();
  const [recording, setRecording] = useState(true)
  // Audio Processing starts here
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: false,
  });

  useEffect(() => {
    mediaBlobUrl && sendToSeverAndTranscribe()
  }, [mediaBlobUrl])


  useEffect(() => {
    if (!window.MediaRecorder) {
      alert("Unsupported Browser");
    } else if (!window.navigator.mediaDevices) {
      alert("This browser doesn't support audio recording");
    }
  });

  useEffect(() => {
    startRecording();
    setTimeout(finishRecording, 10000)
  }, [])

  function finishRecording() {
    stopRecording();
    setRecording(false);
  }

  async function sendToSeverAndTranscribe() {
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
    let filestackAPI = await fetch(`https://www.filestackapi.com/api/store/S3?key=${process.env.REACT_APP_API_KEY2}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'audio/x-wav'
      },
      body: audioFile
    });

    let fileUploaded = await filestackAPI.json();
    const transcript = fileUploaded.url && await sendToTranscribe(fileUploaded.url)
    transcript && dispatch(transcriptionActions.updateEmailId(transcript));
    dispatch(updateRec.updateRecPage(3))
  }

  // Audio processing ends

  return (
    <div className="center-box">
      <h1>What's your email?</h1>
      <div className="loading-bar-container">
        <span className="loading-text">{recording ? "Listening..." : "Uploading..."}</span>
        <div className="loading-bar email-bar"></div>
      </div>
      <p>Up to 10 seconds</p>
      <audio autoplay="true" src={emailAudio}></audio>
    </div>
  )
}

export default AskEmail;