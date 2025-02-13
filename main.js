
// -- audio context instance 
const audioCTX = new (AudioContext || webkitAudioContext)(); 

// -- oscillator 
let osc; 

let waveforms = ['sine', 'triangle', 'sawtooth', 'square']; 

let OSCgain; 

let OSCgainvalue = 0.33; 

let OSCwaveform = 'sine'; 

let velocityGain; 



const oscillators = {}; 



// -- FX 

//      -- filter 

let filterLow; 

let filterHigh; 

let filtertypes = ['lowpass', 'highpass']; 



let filterFrequencyLow = 20000; 

let filterFrequencyHigh = 0; 


//     -- release FX 

let releaseTime = 30; 




initData(); 



function createOSC(frequency, velocityValue) { 
    osc = audioCTX.createOscillator(); 
    
    osc.type = OSCwaveform; 
    osc.frequency.setValueAtTime(frequency, audioCTX.currentTime);  
    OSCgain = audioCTX.createGain(); 
    OSCgain.gain.value = OSCgainvalue; 
    velocityGain = audioCTX.createGain(); 
    velocityGain.gain.value = (1 / 127) * velocityValue; 
    osc.gainObject = OSCgain; 
    osc.filterObjectLow = {}; 
    osc.filterObjectHigh = {}; 
    oscillators[frequency.toString()] = osc; 

} 




// -- midi triggered functions 

function playNote(frequency, velocityValue) {
    createOSC(frequency, velocityValue); 
    createFilterLow(frequency); 
    createFilterHigh(frequency); 
        // -- routing 
        
        oscillators[frequency.toString()]
        .connect(velocityGain)
        .connect(OSCgain)
        .connect(oscillators[frequency.toString()].filterObjectLow)
        .connect(oscillators[frequency.toString()].filterObjectHigh)/*.connect(reverb)*/ 
        .connect(audioCTX.destination); 

    oscillators[frequency.toString()].start(); 
} 

function stopNote(frequency) {
    // -- prevent click 
    if(!oscillators[frequency.toString()]) {
        return; 
    } 
    const osc = oscillators[frequency.toString()]; 
    

    osc.gainObject.gain.setValueAtTime(osc.gainObject.gain.value, audioCTX.currentTime); 
    osc.gainObject.gain.exponentialRampToValueAtTime(0.0001, audioCTX.currentTime + releaseTime / 1000); 

    
    setTimeout(() => {
        osc.stop(); 
        
    }, releaseTime); 

    delete oscillators[frequency.toString()]; 
    
} 

 





function createFilterLow(frequency) { 
    let filter = audioCTX.createBiquadFilter(); 
    
    filter.type = filtertypes[0]; 
    filter.frequency.setTargetAtTime(filterFrequencyLow, audioCTX.currentTime, 0); 

    oscillators[frequency.toString()].filterObjectLow = filter; 

    
} 

function createFilterHigh(frequency) { 
    let filter = audioCTX.createBiquadFilter(); 

    filter.type = filtertypes[1]; 
    filter.frequency.setTargetAtTime(filterFrequencyHigh, audioCTX.currentTime, 0); 


    oscillators[frequency.toString()].filterObjectHigh = filter; 


} 

