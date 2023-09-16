let fastForwardButton = document.getElementById("fastForwardButton");
let motionButton0 = document.getElementById("motionButton0"); 
let muteButton = document.getElementById("muteButton");

let colorChangeButton0 = document.getElementById("colorChangeButton0");
let playButton = document.getElementById("playButton");
let colorChangeButton1 = document.getElementById("colorChangeButton1");

let rewindButton = document.getElementById("rewindButton"); 
let motionButton1 = document.getElementById("motionButton1"); 
let loopButton = document.getElementById("loopButton"); 


let audioElement = document.getElementById("audioElement");

let progressBar = document.getElementById("progressBar");

let audioElementWrapper = document.getElementsByClassName("audio-element-wrapper");
let cd0 = document.getElementById("cd0");
let cd1 = document.getElementById("cd1"); 


audioElement.removeAttribute("controls"); 
audioElement.addEventListener('loadedmetadata', () => {
    progressBar.setAttribute('max', audioElement.duration);
});


audioElement.addEventListener("playing", ()=>{
    cd0.classList.add("cdPlaying0");
    cd1.classList.add("cdPlaying1");
    if (!progressBar.getAttribute('max')){
        progressBar.setAttribute('max', audioElement.duration);
    }
});



/* LOADING */
audioElement.addEventListener("waiting", () => {
    progressBar.classList.add("timeline-loading");
    
});
  audioElement.addEventListener("canplay", () => {
    progressBar.classList.remove("timeline-loading");
});


/* MEDIA FINSIHED */
audioElement.addEventListener("ended", () => {
    playButton.style.backgroundImage = "url('./icons/play.svg')";
});


/* PLAY/PAUSE */
function playPause(){
    if (audioElement.paused || audioElement.ended) {
        audioElement.play();
        playButton.style.backgroundImage = "url('./icons/pause.svg')";
        cd0.style.animationPlayState = "running";
        cd1.style.animationPlayState = "running";
        
      } else {
        audioElement.pause();
        playButton.style.backgroundImage = "url('./icons/play.svg')";
        cd0.style.animationPlayState = "paused";
        cd1.style.animationPlayState = "paused";
        
      }

}

playButton.addEventListener('click', playPause);
cd0.addEventListener('click', playPause);
cd1.addEventListener('click', playPause);
// add timeline scrubbing function using tangent()


/* TIMELINE */
audioElement.addEventListener('timeupdate', () => {
    progressBar.value = audioElement.currentTime;
});

function scrubToTime(e){
    let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
    audioElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * audioElement.duration;
}
function clampZeroOne(input){
    return Math.min(Math.max(input, 0), 1);
  }
  
function logEvent(e){
    console.log(e);
  }

/* Additional Interationc */
//cd animation stops when the music ends
audioElement.addEventListener("ended", (event) => {
    cd0.style.animationPlayState = "paused";
    cd1.style.animationPlayState = "paused";
}); 


/* TIME LINE */
progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
  // the behaviour here is to listen to the mousemove event (fired when the user moves their mouse) when the click is held down but then to stop listening to that 
  // event when the mouse click is released
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});


/* MUTE/UNMUTE */
function muteUnmute(){
    if (audioElement.muted) {
        audioElement.muted = false; 
        muteButton.style.backgroundImage = "url('./icons/mute.svg')";
        muteButton.style.backgroundColor = "white";
        
    } else {
        audioElement.muted = true; 
        muteButton.style.backgroundImage = "url('./icons/unmute.svg')";
        muteButton.style.backgroundColor = "#6f6f6f";
    }
}

muteButton.addEventListener('click', muteUnmute); 

/* LOOP */
function loop(){
    // If it's in loop mode, prevent the song from repeating; if it's not in loop mode, make the song repeat.
    if (audioElement.loop){
        audioElement.loop = false;
        loopButton.style.backgroundColor = "white";
    }
    else{
        audioElement.loop = true; 
        loopButton.style.backgroundColor = "var(--col-06)";
    }

    console.log(audioElement.loop)
    
}

loopButton.addEventListener('click', loop);



/* FAST FORWARD */
function fastForward(){
    if (audioElement.playbackRate == 3){
        audioElement.playbackRate = 1;  //default rate
        fastForwardButton.style.backgroundColor = "white";
        cd0.classList.remove("cdPlaying0Faster");
        cd1.classList.remove("cdPlaying1Faster");

        
    }else{
        audioElement.playbackRate = 3; //faster
        fastForwardButton.style.backgroundColor = "var(--col-05)"; 
        cd0.classList.add("cdPlaying0Faster");
        cd1.classList.add("cdPlaying1Faster");
        rewindButton.style.backgroundColor = "white";
        // If the rewind button is active when clicking the fast forward button, or if the fast forward button is pressed while wanting to rewind, delete the existing animation.
        // However, since CSS is applied from top to bottom of the document, there is no need to remove the added class in the rewind function.
        cd0.classList.remove("cdPlaying0Slower");
        cd1.classList.remove("cdPlaying0Slower"); 

    }
}

/* PREWIND */
function rewind(){
    if (audioElement.playbackRate == 0.2){
        audioElement.playbackRate = 1; //default rate
        rewindButton.style.backgroundColor = "white";
        cd0.classList.remove("cdPlaying0Slower");
        cd1.classList.remove("cdPlaying0Slower"); 
    }else{
        audioElement.playbackRate = 0.2; //slower
        rewindButton.style.backgroundColor = "var(--col-05)"; 
        fastForwardButton.style.backgroundColor = "white";
        cd0.classList.add("cdPlaying0Slower");
        cd1.classList.add("cdPlaying0Slower");
    } 
}

fastForwardButton.addEventListener('click', fastForward); 
rewindButton.addEventListener('click', rewind); 



/* SET BACKGROUND COLOR */
let colorInput = document.getElementById('colorInput'); 
let sec1 = document.getElementsByClassName('sec1')[0]; 

// Set the color received from the user as the background color
function colorChange(){
    sec1.style.backgroundColor = colorInput.value;
    colorInput.value = ''; 
}

colorChangeButton0.addEventListener('click', colorChange)
  
/* REACTION */
let reactionButton = document.getElementById('reactionButton'); 
let reactions = ['🙌', '👏', '🕺', '🎶'];  //Output random reactions to music 
function reaction(){
    reactionButton.textContent = reactions[parseInt(Math.floor(Math.random()*100))%4]; 
    
}

reactionButton.addEventListener('click', reaction)

