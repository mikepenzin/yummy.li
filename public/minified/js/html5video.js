var html5video=!!document.createElement("video").canPlayType,video=document.getElementsByTagName("video")[0],image=document.getElementsByClassName("jumbotron")[0],overlay=document.getElementsByClassName("overlay")[0];(!html5video||window.screen.availWidth<768)&&(video.style.display="none",image.className+=" jumbo-bg-search",overlay.style.display="none");