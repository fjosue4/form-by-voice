import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { updateMic } from '../store/microphone/microphoneSlice'
import { useDispatch } from "react-redux";

function NotAllowedMicrophone() {
    const dispatch = useDispatch();

    function askMicAgain() {
        dispatch(updateMic.micToggle(1))
    }

    return (
        <div className="center-box">
            <Icon icon="ph:smiley-sad-bold" className="sad-icon" />
            <h1>
                There has been problems granting access to your microphone.
            </h1>
            <a href="https://support.google.com/chrome/answer/2693767" target="_blank">
                <button className="btn primary-btn">
                    Learn how to solve
                </button></a>
            <button onClick={askMicAgain} className="btn secondary-btn">
                Solved, try again!
            </button>
        </div>
    )
}

export default NotAllowedMicrophone;