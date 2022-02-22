status="";
objects= [];

function preload(){
img= loadImage("animals.webp");
}
function setup(){
canvas= createCanvas(640,420);
canvas.center();
objectDetector= ml5.objectDetector('cocoSSD',modelLoaded);
document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded(){
console.log("model is initialised");
status = true;
objectDetector.detect(img, gotResult);
}
function gotResult(error,results){
if (error){
    console.log(error);
}
console.log(results);
objects = results;
}

function draw(){
image(img, 0,0,640,420);

if (status != "") {
for (var i = 0; objects.length; i++){
   document.getElementById("status").innerHTML="status: objectsDetected";
   fill("#2E5090");
   var percent= Math.floor(objects[i].confidence*100);
   text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20);
   noFill();
   stroke("#2E5090");
   rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
}
}
}