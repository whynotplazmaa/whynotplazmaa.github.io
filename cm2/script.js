function generateCM2Text(message) {
    const BLOCK_ID = 13; // Text Block ID is 13 in modern CM2 (sometimes 11)
    const STATE = 0;     // Logic state off
    const Y = 0;         // Height
    const Z = 0;         // Depth
    
    let circuitString = "";

    for (let i = 0; i < message.length; i++) {
        // Get the ASCII decimal code for the character
        let asciiCode = message.charCodeAt(i);
        
        // Only include standard characters (ASCII 0-127)
        if (asciiCode > 127) asciiCode = 63; // Replace unknown with '?'

        // Format: ID,State,X,Y,Z,ASCII;
        // i * 1 spreads blocks out horizontally by 1 unit
        circuitString += `${BLOCK_ID},${STATE},${i},${Y},${Z},${asciiCode};`;
    }

    // Add a trailing semicolon to separate blocks and connections
    return circuitString + "?"; 
}

// Example usage:
const mySaveString = generateCM2Text("HELLO");
console.log(mySaveString); 
// Output: 13,0,0,0,0,72;13,0,1,0,0,69;13,0,2,0,0,76;13,0,3,0,0,76;13,0,4,0,0,79;?
