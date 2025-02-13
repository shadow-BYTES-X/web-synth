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
          document.body.style.backgroundColor = 'red';
        } 
        else {
          //-- note is off 
          document.body.style.backgroundColor = 'blue'; 
        } 
        
        break; 
        
      case 128: 
        //-- note is off 
        document.body.style.backgroundColor = 'blue'; 
        
        break; 
    }
  }
  
  function updateDevices(event) {
    console.log(`${event.port.name} by ${event.port.manufacturer}`); 
    
    
    let deviceText = document.createElement('p'); 
    deviceText.textContent = `${event.port.name} by ${event.port.manufacturer}`; 
    
   document.querySelector('#deviceZone').append(deviceText);
    
  } 
  
    
    
