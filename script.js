//window.location.replace("coming-soon.html");

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

window.onload = function(){
loadDoc("brikfigs.txt", populateGallery);
}

function loadDoc(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}

function populateGallery(xhttp){
  let bfData = JSON.parse(xhttp.responseText);
  let bf_count = bfData.length;
  let min_time = 20000;
  let max_time = 40000;
  var gal_size = 9;
  let card_id = "card_";
  let card = Array(gal_size);
  var card_delay;
  for (i = 0; i < gal_size; i++) {
    card_id = card_id.concat(i);
    do{
      x =  Math.floor(Math.random() * (bf_count));
    } while (card.includes(x) === true);
    card[i] = x;
    document.getElementById(card_id).firstElementChild.alt = bfData[card[i]].name;
    document.getElementById(card_id).firstElementChild.src = bfData[card[i]].image;
    document.getElementById(card_id).style.backgroundColor = bfData[card[i]].background;
    let card_delay = Math.floor(Math.random() * (max_time - min_time)) + min_time;
    window.setTimeout(changeCard, card_delay, bf_count, bfData, card_id, card, i, min_time, max_time);
    card_id = "card_";
  }
}

function changeCard(bf_count, bfData, card_id, card, i, min_time, max_time){
  do{
    x =  Math.floor(Math.random() * (bf_count));
  } while (card.includes(x) === true);
  card[i] = x;
  fadeOutIn(card_id, bfData, card, i);
  let card_delay = Math.floor(Math.random() * (max_time - min_time)) + min_time;
  window.setTimeout(changeCard, card_delay, bf_count, bfData, card_id, card, i, min_time, max_time);
}

function fadeOutIn(card_id, bfData, card, i){
  let opacity = 1;
  var timer = setInterval(function(){
    if(opacity < 0.1){
      clearInterval(timer);
      document.getElementById(card_id).firstElementChild.alt = bfData[card[i]].name;
      document.getElementById(card_id).firstElementChild.src = bfData[card[i]].image;
      document.getElementById(card_id).style.backgroundColor = bfData[card[i]].background;
      fadeIn(card_id, opacity);
    }
    document.getElementById(card_id).firstElementChild.style.opacity = opacity;
    document.getElementById(card_id).style.opacity = opacity;
    opacity -= 0.1;
  }, 50);
}

function fadeIn(card_id, opacity){
  var timer = setInterval(function () {
    if (opacity >= 1){
      clearInterval(timer);
    }
    document.getElementById(card_id).firstElementChild.style.opacity = opacity;
    document.getElementById(card_id).style.opacity = opacity;
    opacity += 0.1;
  }, 50);
}
