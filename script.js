document.getElementById('downloadBtn').addEventListener('click', function(e) {
    const status = document.getElementById('status');
    status.style.color = "#4cd964"; // iOS Green
    status.innerText = "Download starting...";
    
    // Optional: Log success or handle errors via fetch if needed
    setTimeout(() => {
        status.innerText = "";
    }, 3000);
});
