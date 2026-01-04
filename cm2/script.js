function generateText() {
   
    const text = document.getElementById('textInput').value;
    
    const outputDiv = document.getElementById('textOutput');
    
    
    const BLOCK_ID = 11; 
    const STATE = 0; 
    const Y = 0;     
    const Z = 0;     
    
    let circuitString = "";

    for (let i = 0; i < text.length; i++) {
        let asciiCode = text.charCodeAt(i);
        if (asciiCode > 127) asciiCode = 63; 

        
       
        circuitString += `${BLOCK_ID},${STATE},${i},${Y},${Z},${asciiCode};`;
    }

    
    const finalString = circuitString + "?"; 
    
   
    outputDiv.innerText = finalString;
    outputDiv.style.display = 'block'; 

    
    navigator.clipboard.writeText(finalString);
    alert("Generated string copied to clipboard! The string should now import correctly.");
}

