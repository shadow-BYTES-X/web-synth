function midiToFrequency(number) {
    const a = 440; 

    return (a / 32) * (2 ** ((number - 9) / 12)); 
}





if(navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure); 
  } 
  
  function success(midiAccess) {
    
    midiAccess.addEventListener('statechange', updateDevices); 
    
    const inputs = midiAccess.inputs; 
    
    inputs.forEach((input) => {
      console.log(input); 
      input.addEventListener('midimessage', handleInput); 
    }); 
    
    
  } 
  
  function failure() {
    console.log('failed to get midi acces'); 
  } 
  
  function handleInput(input) {
    const command = input.data[0]; 
    const note = input.data[1]; 
    const velocity = input.data[2]; 
    
    switch(command) {
      case 144: 
        if(velocity > 0) {
          //-- note is on 
          playNote(midiToFrequency(note), velocity); 
        } 
        else {
          //-- note is off 
          stopNote(midiToFrequency(note)); 
        } 
        
        break; 
        
      case 128: 
        //-- note is off 
        stopNote(midiToFrequency(note)); 
        
        break; 
    }
  }
  
  function updateDevices(event) {
    console.log(`${event.port.name} by ${event.port.manufacturer}`); 
  } 
  
    
    
