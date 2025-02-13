let waveFader = document.querySelector('#wave'); 

let volumeFader = document.querySelector('#volume'); 

let frequencyFaderLow = document.querySelector('#filterfrequencylow'); 

let frequencyFaderHigh = document.querySelector('#filterfrequencyhigh'); 

let releaseTimeFader = document.querySelector('#releasetime'); 



function initData() { 
    volumeFader.value = OSCgainvalue; 
    document.querySelector('#volumenumber').textContent = volumeFader.value; 
    frequencyFaderLow.value = filterFrequencyLow; 
    document.querySelector('#frequencynumberlow').textContent = frequencyFaderLow.value; 
    frequencyFaderHigh.value = filterFrequencyHigh; 
    document.querySelector('#frequencynumberhigh').textContent = frequencyFaderHigh.value; 
    releaseTimeFader.value = releaseTime; 
    document.querySelector('#releasenumber').textContent = releaseTimeFader.value; 
    
} 

// -- fader values 

//      -- osc 
waveFader.addEventListener('input', () => { 
    osc.type = waveforms[waveFader.value]; 
    OSCwaveform = waveforms[waveFader.value]; 
    document.querySelector('#wavenumber').textContent = waveFader.value; 

}); 

volumeFader.addEventListener('input', () => { 
    OSCgain.gain.value = volumeFader.value; 
    OSCgainvalue = volumeFader.value; 
    document.querySelector('#volumenumber').textContent = volumeFader.value; 

}); 

//      -- filter 

frequencyFaderLow.addEventListener('input', () => {
    console.log('lowpass'); 
    console.log(oscillators);
    for(osc in oscillators) { 
        console.log(osc); 
        oscillators[osc].filterObject.frequency.setTargetAtTime(frequencyFaderLow.value, audioCTX.currentTime, 0);
    }
    filterFrequencyLow = frequencyFaderLow.value; 

    document.querySelector('#frequencynumberlow').textContent = frequencyFaderLow.value; 

}); 

frequencyFaderHigh.addEventListener('input', () => { 
    console.log('highpass');
    filterHigh.frequency.setTargetAtTime(frequencyFaderHigh.value, audioCTX.currentTime, 0); 
    filterFrequencyHigh = frequencyFaderHigh.value; 

    document.querySelector('#frequencynumberhigh').textContent = frequencyFaderHigh.value; 
}); 

//        -- release FX 

releaseTimeFader.addEventListener('input', () => {
    releaseTime = releaseTimeFader.value; 
    document.querySelector('#releasenumber').textContent = releaseTimeFader.value; 
});



//  -- component setup 



