const apiKey = process.env.REACT_APP_API_KEY1

async function sendToTranscribe(url) {
    let transcripAPI = await fetch ("https://api.assemblyai.com/v2/transcript", {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: `{"audio_url": "${url.toString()}"}`
    });
    
    let transcriptionId = await transcripAPI.json();
    return transcriptionId.id
  }

  export async function getTranscription(id) {
    let getURL = `https://api.assemblyai.com/v2/transcript/${id}`
    let transcriptionResultAPI = await fetch (getURL, {
      method: 'GET',
      headers: {'authorization': apiKey,
      'Content-Type': 'application/json'
    }
    })
    let transcriptionObject = await transcriptionResultAPI.json()
    return transcriptionObject
  }

export default sendToTranscribe;