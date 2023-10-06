// Get each subelement of the eyeball object and assign it to a variable.

let leftBlue = document.getElementById("leftBlue"); 
let rightBlue = document.getElementById("rightBlue"); 

let leftEye = document.getElementById("leftEye");
let rightEye = document.getElementById("rightEye"); 

let leftBlack = document.getElementById("leftBlack"); 
let rightBlack = document.getElementById("rightBlack"); 


// Set boolean variables to display different functions based on day and night.
let day = true; 


// Manage the movement of the eyeball object while hovering.
document.addEventListener("mousemove", function(event){
    if (day){

        // The coordinates of the mouse position on the screen.
        let mouseX = event.clientX; 
        let mouseY = event.clientY; 

        // The size of the entire screen.
        let width = document.documentElement.clientWidth; 
        let height = document.documentElement.clientHeight; 
        
        // Calculate the relative position of the mouse with respect to the entire screen. 
        // Use this variable to apply various offset values to each subelement of the eyeball object, 
        // synchronizing the movement of these elements with the mouse.
        let relX = (width-mouseX)/width; 
        let relY = (height-mouseY)/height;

        let eyeTop = -relY*10;
        let eyeRight = relX*10;  


        let blueTop = 70-(relY*65);
        let blueRight = (relX*65);

        let blackTop = 60-(relY*55);
        let blackRight = (relX*55); 
        

        // Apply the coordinates created by adding offsets to the relX and relY values to each of the subelements.
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


// Apply twitching animation to the eyeball object when it becomes night.
function twitching(){

    // align the coordinates of the other subelements to face forward, excluding the invisible white part.
    leftBlack.style.top = "32.5px"; 
    rightBlack.style.top = "32.5px"; 
    leftBlack.style.right = "32.5px"; 
    rightBlack.style.right = "32.5px"; 

    leftEye.classList.add("twitching-animation");
    rightEye.classList.add("twitching-animation");

}; 



let dragLine_Wrapper = document.getElementsByClassName("dragLine-Wrapper")[0]; 
let dashLine = document.getElementById('dashLine'); 

// This variable indicates whether the user is approaching the drag line to control the power of the light bulb.
let dragState = false;  

// These variables are created to calculate the extent to which the user is dragging the line and to increase or decrease the length of the line accordingly.
// Since the coordinates of the starting and ending points of the drag are individually checked and stored in variables, they are declared outside of the function.
let dragStart, dragEnd, dragAmount; 

let light = document.getElementById("light");


dragLine_Wrapper.addEventListener("mousedown", function(event){
    dragStart = event.clientY;
    dragState = true; 

    // To indicate that the user has grabbed the drag line, the cursor's shape is changed.
    dragLine_Wrapper.style.cursor = "grabbing";    
});


document.addEventListener("mousemove", function(event){
    if (dragState){
        
        dragEnd = event.clientY; 

        // The length of the existing drag line, which is initially 300, is increased by the length that the user has dragged.
        dragAmount = 300+dragEnd-dragStart; 

        // To prevent the drag line from becoming excessively long, specify a maximum height.
        if (dragAmount > 450){
            dragAmount = 450; 
        }
        dashLine.style.height = dragAmount+"px"; 

    }

}); 
let bg = window.getComputedStyle(document.body); 

// This is the background music that plays when day = true.
let audio = document.getElementById("dayMusic"); 

let soundEffect = new Audio('on.mp3'); 



// The sound effect for when the drag line is pulled is recorded and used.
document.addEventListener("mouseup", function(event){
    if (dragState){
        // When the mouse click is released, it is recognized as the user's action of pulling the drag line coming to an end.
        dragState = false;
        soundEffect.play(); 
        

        // If it is night, dragging will turn it into day, and if it is day, dragging will turn it into night.
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

            // This function applies a twitching animation and adjusts the position of the object, created to avoid the complexity of the code.
            twitching(); 

        }        
        
        dashLine.style.height = "300px";
        dragLine_Wrapper.style.cursor = "grab";
        
        
    }
    
});
