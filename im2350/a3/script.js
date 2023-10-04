let leftBlue = document.getElementById("leftBlue"); 
let rightBlue = document.getElementById("rightBlue"); 

let leftEye = document.getElementById("leftEye");
let rightEye = document.getElementById("rightEye"); 

let leftBlack = document.getElementById("leftBlack"); 
let rightBlack = document.getElementById("rightBlack"); 

let day = true; 

document.addEventListener("mousemove", function(event){
    if (day){
        let mouseX = event.clientX; 
        let mouseY = event.clientY; 
        let width = document.documentElement.clientWidth; 
        let height = document.documentElement.clientHeight; 
        
        let relX = (width-mouseX)/width; 
        let relY = (height-mouseY)/height;

        let eyeTop = -relY*10;
        let eyeRight = relX*10;  


        let blueTop = 70-(relY*65);
        let blueRight = (relX*65);

        let blackTop = 60-(relY*55);
        let blackRight = (relX*55); 
        

        leftEye.style.top = eyeTop+"px";
        rightEye.style.top = eyeTop+"px";
        leftEye.style.right = eyeRight+"px";
        rightEye.style.right = eyeRight+"px";
        leftBlue.style.top = blueTop+"px"; 
        rightBlue.style.top = blueTop+"px";
        leftBlue.style.right = blueRight+"px";
        rightBlue.style.right = blueRight+"px";
        leftBlack.style.top = blackTop+"px"; 
        rightBlack.style.top = blackTop+"px";
        leftBlack.style.right = blackRight+"px"; 
        rightBlack.style.right = blackRight+"px";
    }
}); 

function twitching(){

    leftBlack.style.top = "32.5px"; 
    rightBlack.style.top = "32.5px"; 
    leftBlack.style.right = "32.5px"; 
    rightBlack.style.right = "32.5px"; 

    leftEye.classList.add("twitching-animation");
    rightEye.classList.add("twitching-animation");

}; 



let dragLine_Wrapper = document.getElementsByClassName("dragLine-Wrapper")[0]; 
let dashLine = document.getElementById('dashLine'); 

let dragState = false;  
let dragStart, dragEnd, dragAmount; 

let light = document.getElementById("light");

dragLine_Wrapper.addEventListener("mousedown", function(event){
    dragStart = event.clientY;
    dragState = true; 
    dragLine_Wrapper.style.cursor = "grabbing";
    
    
});


document.addEventListener("mousemove", function(event){
    
    if (dragState){
        
        dragEnd = event.clientY; 
        dragAmount = 300+dragEnd-dragStart; 

        if (dragAmount > 450){
            dragAmount = 450; 
        }
        dashLine.style.height = dragAmount+"px"; 

    }

}); 
let bg = window.getComputedStyle(document.body); 
let audio = document.getElementById("dayMusic"); 
let soundEffect = new Audio('on.mp3'); 




document.addEventListener("mouseup", function(event){
    if (dragState){
        dragState = false;
        soundEffect.play(); 
        
        if (document.body.style.backgroundColor == "rgb(0, 0, 0)"){
            document.body.style.backgroundColor = "#CDCDCD"; 
            light.style.backgroundColor = "#EBFF00" 
            audio.muted = false; 
            leftEye.style.backgroundImage = "eye.png";
            leftEye.classList.remove("twitching-animation");
            rightEye.classList.remove("twitching-animation");
            day = true; 

        }else{
            document.body.style.backgroundColor = "#000000"; 
            light.style.backgroundColor = "#000000"
            audio.muted = true; 
            leftEye.style.backgroundImage = "eye.png";
            day = false; 
            twitching(); 

        }        
        
        dashLine.style.height = "300px";
        dragLine_Wrapper.style.cursor = "grab";
        
        
    }
    
});