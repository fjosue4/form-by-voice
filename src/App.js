import './App.css';
import AllowMicrophone from './components/AllowMicrophone/AllowMicrophone';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NotAllowedMicrophone from './components/NotAllowedMicrophone/NotAllowedMicrophone';
import AskName from './components/AskComponent/AskName';
import AskEmail from './components/AskComponent/AskEmail';
import AskCompany from './components/AskComponent/AskCompany';
import Preview from './components/Preview/Preview';
import BrowserAlert from './components/BrowserAlert/BrowserAlert';
import './responsive.css'

function App() {
  const [micAuth, setMicAuth] = useState(1);
  const [browser, setBrowser] = useState("")
  const micState = useSelector(state => state.microphone.micValue);
  const recordingPage = useSelector(state => state.recording.recPage)
  const recordingCompleted = useSelector(state => state.result.completed)

  useEffect(() => {
    setMicAuth(micState)
  }, [micState])

  /* Check browser */

  function browserDetection() {
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "Safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "Opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "Microsoft Edge";
    } else {
      browserName = "No browser detection";
    }
    return browserName
  }

  useEffect(() => {
    setBrowser(browserDetection())
  }, [])

  return (
    <div className="App">
      {browser !== 'Chrome' && <BrowserAlert browser={browser} />}
      {micAuth === 1 && !recordingCompleted && <AllowMicrophone />}
      {micAuth === 3 && !recordingCompleted && <NotAllowedMicrophone />}
      {recordingPage === 1 && !recordingCompleted && <AskName />}
      {recordingPage === 2 && !recordingCompleted && <AskEmail />}
      {recordingPage === 3 && !recordingCompleted && <AskCompany />}
      {recordingCompleted && <Preview />}
    </div>
  );
}

export default App;
