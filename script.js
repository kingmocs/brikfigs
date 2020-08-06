window.location.replace("coming-soon.html");

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
window.onload = function(){

function getRandomTime(min_time, max_time) {
  return Math.floor(Math.random() * (max_time - min_time)) + min_time;
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var bfData = JSON.parse(this.responseText);

    var bf_count = bfData.length;
    var gal_size = 12;
    var card_id = "card_";
    var card = 0;
    for (i = 0; i < gal_size; i++) {
      card =  Math.floor(Math.random() * (bf_count - 1));
      card_id = card_id.concat(i);
      document.getElementById(card_id).firstElementChild.src = bfData[card].image;
      document.getElementById(card_id).firstElementChild.alt = bfData[card].name;
      card_id = "card_";
    }
  }
}
xmlhttp.open("GET", "brikfigs.txt", true);
xmlhttp.send();


}
