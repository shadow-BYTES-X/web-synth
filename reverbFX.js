const reverb = audioCTX.createConvolver();

try {
  const response = await fetch(
    "./audio/concert-crowd.ogg",
  ); 
  const arrayBuffer = await response.arrayBuffer();
  const decodedAudio = await audioCtx.decodeAudioData(arrayBuffer);
  reverb.buffer = decodedAudio;
} catch (error) {
  console.error(
    `Unable to fetch the audio file: ${navigator.name} Error: ${err.message} `,
  );
} 

