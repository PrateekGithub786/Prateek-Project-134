object = [];
status = "";

function preload(){
    sound = loadSound("astronaut.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetect.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    object = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if(status != ""){
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill(255, 0, 0);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " %", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object.label == "person"){
                sound.stop();
                document.getElementById("detected").innerHTML = "Baby Found";
            }else{
                sound.play();
                document.getElementById("detected").innerHTML = "Baby Not Found";
            }
            
        }

        if(object.length < 0){
                sound.play();
                document.getElementById("detected").innerHTML = "Baby Not Found";
        }
    }
}