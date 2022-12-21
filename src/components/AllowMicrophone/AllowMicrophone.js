import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMic } from '../store/microphone/microphoneSlice'
import { updateRec } from "../store/recording/recordingSlice";

function AllowMicrophone() {
    const dispatch = useDispatch();
    const [permission, setPermission] = useState("pending")

    function allowMic() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                dispatch(updateMic.micToggle(2))
                dispatch(updateRec.updateRecPage(1))
            })
            .catch(function (err) {
                dispatch(updateMic.micToggle(3))
                console.log(err)
            });
    }


    return (
        <div className="center-box">
            <h1>
                Welcome to the Form by Voice prototype
            </h1>
            <button className="btn primary-btn" onClick={allowMic}>
                Allow Microphone
            </button>
            <p className="buttom-multiline">
                This form doesn't collect data for any purpose.<br />
                There's no database connected to this site.<br />
                Feel free to use dummy data to test.<br />
                <a href="https://github.com/fjosue4/form-by-voice/" target="_blank">Check source code here</a>
            </p>
        </div>
    )
}

export default AllowMicrophone;