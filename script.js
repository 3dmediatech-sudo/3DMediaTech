document.getElementById("loadVideo").addEventListener("click", function () {
    let link = document.getElementById("videoLink").value.trim();
    let videoId = "";

    if (link.includes("youtube.com/watch?v=")) {
        videoId = link.split("v=")[1].split("&")[0];
    } 
    else if (link.includes("youtu.be/")) {
        videoId = link.split("youtu.be/")[1].split("?")[0];
    } 
    else {
        alert("Only approved media links are supported in this demo.");
        return;
    }

    document.getElementById("videoBox").innerHTML =
        `<iframe width="700" height="394"
        src="https://www.youtube.com/embed/${videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
});