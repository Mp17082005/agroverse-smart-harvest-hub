
// AssemblyAI API key
const API_KEY = "bdba66bb7dfa40eaa4fe25dd0d2dd90e";

interface TranscriptionOptions {
  language_code?: string;
  audio_start_from?: number;
  word_boost?: string[];
}

export async function transcribeAudio(audioBlob: Blob, options: TranscriptionOptions = {}) {
  try {
    // Step 1: Upload the audio file
    const uploadResponse = await fetch("https://api.assemblyai.com/v2/upload", {
      method: "POST",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json",
      },
      body: audioBlob
    });
    
    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload audio: ${uploadResponse.status}`);
    }
    
    const uploadResult = await uploadResponse.json();
    const audioUrl = uploadResult.upload_url;
    
    // Step 2: Submit transcription request
    const transcriptResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        language_code: options.language_code || "hi", // Default to Hindi
        word_boost: options.word_boost || [],
        audio_start_from: options.audio_start_from || 0
      })
    });
    
    if (!transcriptResponse.ok) {
      throw new Error(`Failed to request transcription: ${transcriptResponse.status}`);
    }
    
    const transcriptResult = await transcriptResponse.json();
    const transcriptId = transcriptResult.id;
    
    // Step 3: Poll for results until complete
    let status = "processing";
    let result;
    
    while (status === "processing" || status === "queued") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const pollingResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          "Authorization": API_KEY
        }
      });
      
      result = await pollingResponse.json();
      status = result.status;
    }
    
    if (status === "completed") {
      return {
        success: true,
        text: result.text,
        words: result.words
      };
    } else {
      throw new Error(`Transcription failed with status: ${status}`);
    }
  } catch (error) {
    console.error("Transcription error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error during transcription"
    };
  }
}

// Function to record audio
export async function recordAudio(timeLimit = 30000): Promise<Blob | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: BlobPart[] = [];
    
    return new Promise((resolve, reject) => {
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        // Stop all audio tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
        
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        resolve(audioBlob);
      });
      
      mediaRecorder.addEventListener("error", (error) => {
        reject(error);
      });
      
      // Start recording
      mediaRecorder.start();
      
      // Stop recording after timeLimit
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, timeLimit);
    });
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
}
