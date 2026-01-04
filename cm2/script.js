function generateCM2Text(message) {
    const BLOCK_ID = 13; 
    const STATE = 0;     
    const Y = 0;         
    const Z = 0;        
    
    let circuitString = "";

    for (let i = 0; i < message.length; i++) {
        
        let asciiCode = message.charCodeAt(i);
        
       
        if (asciiCode > 127) asciiCode = 63; '

      
        circuitString += `${BLOCK_ID},${STATE},${i},${Y},${Z},${asciiCode};`;
    }

    
    return circuitString + "?"; 
}


const mySaveString = generateCM2Text("HELLO");
console.log(mySaveString); 

