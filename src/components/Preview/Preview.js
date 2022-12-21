import React, { useEffect, useState } from "react";
import readyAudio from '../../audio/end.wav';
import { useDispatch, useSelector } from "react-redux";
import { getTranscription } from "../../API/transcribeAPI";
import { resultActions } from "../store/result/resultSlice";
import { transcriptionActions } from "../store/transcription/transcriptionSlice";
import { updateRec } from "../store/recording/recordingSlice";

function Preview() {
    const [status, setStatus] = useState("pending")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")

    const nameSaved = useSelector(state => state.result.name)
    const emailSaved = useSelector(state => state.result.email)
    const companySaved = useSelector(state => state.result.company)

    const dispatch = useDispatch()

    const nameId = useSelector(state => state.transcription.nameTranscriptionId)
    const emailId = useSelector(state => state.transcription.emailTranscriptionId)
    const companyId = useSelector(state => state.transcription.companyTranscriptionId)

    function clearTranscription(str, type) {
        let noSymbols = str.toLowerCase().replace(/[^a-zA-Z0-9.@ ]/g, '')
        if (type === 'name' || type === 'company') {
            let clearName = noSymbols.replace(/(my name is|hi i am|hi im|hey i am|hey im|i work at|i |work for|i work for|my company name is|my company is|hello|hi|please|say|your|name)\s*/, '')
            let words = clearName.toLowerCase().split(' ')
            let UpperCaseName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            return UpperCaseName
        } else {
            return noSymbols.replace(/my email is|you can reach me at|contact me at|email|reach|you/g, '')
        }
    }

    async function getAllTranscripts() {
        const nameObj = await getTranscription(nameId);
        let nameValue = await nameObj.text
        let nameStatus = await nameObj.status
        const emailObj = await getTranscription(emailId);
        let emailValue = await emailObj.text
        let emailStatus = await emailObj.status
        const companyObj = await getTranscription(companyId);
        let companyValue = await companyObj.text
        let companyStatus = await companyObj.status
        if (nameStatus === "completed" && emailStatus === "completed" && companyStatus === "completed") {
            setName(clearTranscription(nameValue, 'name'));
            setEmail(clearTranscription(emailValue, 'email'));
            setCompany(clearTranscription(companyValue, 'company'));
            setStatus("ready")
        } else if (nameObj.error) {
            clearPersist()
        } else {
            getAllTranscripts()
        }
    }

    useEffect(() => {
        status === "pending" && getAllTranscripts()
    }, [])

    function clearPersist() {
        dispatch(resultActions.updateName(""))
        dispatch(resultActions.updateEmail(""))
        dispatch(resultActions.updateCompany(""))
        dispatch(resultActions.setCompleted(false))
        dispatch(transcriptionActions.updateCompanyId(""))
        dispatch(transcriptionActions.updateEmailId(""))
        dispatch(transcriptionActions.updateNameId(""))
        dispatch(updateRec.updateRecPage(1))
    }

    useEffect(() => {
        dispatch(resultActions.updateName(name))
        dispatch(resultActions.updateEmail(email))
        dispatch(resultActions.updateCompany(company))
    }, [status])

    return (
        <div className="center-box">
            <audio autoPlay="true" src={readyAudio}></audio>
            {status === "pending" ?
                <div className="loading-result">
                    <h1>We got your info!</h1>
                    <div className="summary-loader"></div>
                    <p className="buttom-multiline">This demo uses free plans and could take several minutes to show the results. <br />
                        We assigned you an ID to this browser so you can come back and check later.</p>
                </div>
                :
                <div className="final-result">
                    <h1>Your form summary</h1>
                    <div className="result-summary">
                        <p className="buttom-multiline">
                            Your name is: <strong>{nameSaved}</strong> <br />
                            Your email is: <strong>{emailSaved}</strong> <br />
                            You work at: <strong>{companySaved}</strong>
                        </p>
                    </div>
                    <button className="btn primary-btn" onClick={clearPersist}>
                        Start again
                    </button>
                </div>
            }
        </div>
    )
}

export default Preview;