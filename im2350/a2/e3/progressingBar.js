function countPercent(loadTime){

    
    var delayTime =loadTime/150;
    var cnt=0;
  
    var interval = setInterval(function() { 
        document.getElementById("load-throbber").textContent = cnt+"%";
        cnt++; 
      
        if (cnt > 100) {
          clearInterval(interval); 
        }
      }, delayTime);
    
    
  }