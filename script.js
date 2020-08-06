//window.location.replace("coming-soon.html");

//Declare variabls

function getID(clicked_id){
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  //var img = document.getElementById(clicked_id);
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  modal.style.display = "block";
  modalImg.src = document.getElementById(clicked_id).firstElementChild.src;
  captionText.innerHTML = document.getElementById(clicked_id).firstElementChild.alt;

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

function navIcon() {
  var x = document.getElementById("mainnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var min_time = 20000;
var max_time = 60000;
function getRandomTime(min_time, max_time) {
  return Math.floor(Math.random() * (max_time - min_time)) + min_time;
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    document.getElementById("test").innerHTML = myArr[0].name;
  }
};
xmlhttp.open("GET", "brikfigs.txt", true);
xmlhttp.send();

document.getElementById("img-02").src = "clown.png";
