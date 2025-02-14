let waveFader = document.querySelector('#wave'); 

let volumeFader = document.querySelector('#volume'); 

let frequencyFaderLow = document.querySelector('#filterfrequencylow'); 

let frequencyFaderHigh = document.querySelector('#filterfrequencyhigh'); 

let releaseTimeFader = document.querySelector('#releasetime'); 

let backgroundImageIteration = 0;



function initData() { 
    document.querySelector('#wavenumber').textContent = OSCwaveform; 
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
    OSCwaveform = waveforms[waveFader.value]; 
    document.querySelector('#wavenumber').textContent = waveforms[waveFader.value]; 
    backgroundImageIteration = waveFader.value; 
    let path = "url('./img/synthwave-background-" + (parseInt(backgroundImageIteration) + parseInt(1)) +".jpg')"; 
    console.log(path);
    document.body.style.backgroundImage = path; 
    
    osc.type = waveforms[waveFader.value]; 

}); 

volumeFader.addEventListener('input', () => { 
    OSCgainvalue = volumeFader.value; 
    document.querySelector('#volumenumber').textContent = volumeFader.value; 
    OSCgain.gain.value = volumeFader.value; 
}); 

//      -- filter 

frequencyFaderLow.addEventListener('input', () => {
    for(osc in oscillators) { 
        oscillators[osc].filterObjectLow.frequency.setTargetAtTime(frequencyFaderLow.value, audioCTX.currentTime, 0);
    }
    filterFrequencyLow = frequencyFaderLow.value; 

    document.querySelector('#frequencynumberlow').textContent = frequencyFaderLow.value; 

}); 

frequencyFaderHigh.addEventListener('input', () => {
    for(osc in oscillators) {
    oscillators[osc].filterObjectHigh.frequency.setTargetAtTime(frequencyFaderHigh.value, audioCTX.currentTime, 0); 
    filterFrequencyHigh = frequencyFaderHigh.value; 
    }
    document.querySelector('#frequencynumberhigh').textContent = frequencyFaderHigh.value; 
}); 

//        -- release FX 

releaseTimeFader.addEventListener('input', () => {
    releaseTime = releaseTimeFader.value; 
    document.querySelector('#releasenumber').textContent = releaseTimeFader.value; 
});



//  -- component setup 



