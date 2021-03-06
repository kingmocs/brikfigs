//window.location.replace("coming-soon.html");
var bf_data = [];
var bf_count;
var bfm_data = [];
var bfm_count;
var bfm_combo = [];
var bfm_combo_count;


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
  document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
          modal.style.display = "none";
      }
  }
}

function navIcon() {
  var x = document.getElementById("navbar");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

window.onload = function(){
  loadDoc("brikfigs.txt", bfData);
  loadDoc("brikfigs_motion.txt", bfmData);
  dropDown();
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

function bfData(xhttp){
  bf_count = JSON.parse(xhttp.responseText).length;
  for(j = 0; j < bf_count; j++){
    bf_data.push(JSON.parse(xhttp.responseText)[j]);
  }
  if (window.location.href.match('figs.html') != null)
 {
    filterFigs("all");
  }
  else if (window.location.href.match('index.html') != null ||
window.location.hostname != null){
    populateGallery();
  }
}

function bfmData(xhttp){
  bfm_count = JSON.parse(xhttp.responseText).length;
  for(j = 0; j < bfm_count; j++){
    bfm_data.push(JSON.parse(xhttp.responseText)[j]);
  }
  if (window.location.href.match('motion.html') != null) {
    motionPage();
  }
  else if (window.location.href.match('index.html') != null ||
window.location.hostname != null){
    populateMotion();
  }
}

function populateGallery(){
  let min_time = 15000;
  let max_time = 30000;
  var gal_size = 9;
  let card_id = "card_";
  let card = Array(gal_size);
  var card_delay;
  for (i = 0; i < gal_size; i++) {
    card_id = card_id.concat(i);
    do{
    var  x =  Math.floor(Math.random() * (bf_count));
    } while (card.includes(x) === true);
    card[i] = x;
    document.getElementById(card_id).firstElementChild.alt = bf_data[card[i]].name;
    document.getElementById(card_id).firstElementChild.src = bf_data[card[i]].image;
    document.getElementById(card_id).style.backgroundColor = bf_data[card[i]].background;
    var card_delay = Math.floor(Math.random() * (max_time - min_time)) + min_time;
    window.setTimeout(changeCard, card_delay, card_id, card, i, min_time, max_time);
    card_id = "card_";
  }
}

function changeCard(card_id, card, i, min_time, max_time){
  do{
  var  x =  Math.floor(Math.random() * (bf_count));
  } while (card.includes(x) === true);
  card[i] = x;
  fadeOutIn(card_id, card, i);
  var card_delay = Math.floor(Math.random() * (max_time - min_time)) + min_time;
  window.setTimeout(changeCard, card_delay, card_id, card, i, min_time, max_time);
}

function fadeOutIn(card_id, card, i){
  let opacity = 1;
  var timer = setInterval(function(){
    if(opacity < 0.1){
      clearInterval(timer);
      document.getElementById(card_id).firstElementChild.alt = bf_data[card[i]].name;
      document.getElementById(card_id).firstElementChild.src = bf_data[card[i]].image;
      document.getElementById(card_id).style.backgroundColor = bf_data[card[i]].background;
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

function populateMotion(xhttp){
  var card_delay = 15000;
  var x =  Math.floor(Math.random() * (bfm_count));
  document.getElementById("card_09").firstElementChild.alt = bfm_data[x].name;
  document.getElementById("card_09").firstElementChild.src = bfm_data[x].image;
  document.getElementById("card_09").style.backgroundColor = bfm_data[x].background;
  window.setTimeout(changeMotion, card_delay, card_delay, x);
}

function changeMotion(card_delay, i){
  var v;
  do{
    v =  Math.floor(Math.random() * bfm_count);
  }while(v === i);
  console.log(card_delay);
  let opacity = 1;
  var timer = setInterval(function(){
    if(opacity < 0.1){
      clearInterval(timer);
      document.getElementById("card_09").firstElementChild.alt = bfm_data[v].name;
      document.getElementById("card_09").firstElementChild.src = bfm_data[v].image;
      document.getElementById("card_09").style.backgroundColor = bfm_data[v].background;
      fadeIn("card_09", opacity);
    }
    document.getElementById("card_09").firstElementChild.style.opacity = opacity;
    document.getElementById("card_09").style.opacity = opacity;
    opacity -= 0.1;
  }, 50);
  window.setTimeout(changeMotion, card_delay, card_delay, v);
}

function filterFigs(filter){
  var btn = document.getElementById(filter);
  var t = document.getElementById("dropNav");
  l = t.children.length;
  for (i = 0; i < l; i++){
    t.children[i].style.backgroundColor = "#aaaaaa";
  }
  btn.style.backgroundColor = "#005e8a";
  var x = document.querySelector(".figsgallery"); //gallery
  var y; //div
  var z; //img
  var nme; //text
  var pcs; //part count
  var dv;
  while (x.hasChildNodes() === true){
    x.removeChild(x.firstChild);
  }
  for(i = 0; i < bf_count; i++){
    if(bf_data[i].tags.includes(filter) === true){
      y = document.createElement("DIV");
      y.className ="container";
      y.style.backgroundColor = bf_data[i].background;
      y.id = "fig_" + i;
      y.addEventListener("click", function(){ getID(this.id); });
      z = document.createElement("IMG");
      z.alt = bf_data[i].name;
      z.src = bf_data[i].image;
      dv = document.createElement("DIV");
      dv.className = "figinfo";
      nme = document.createElement("H2");
      nme.className = "nme";
      nme.innerHTML = bf_data[i].name;
      pcs = document.createElement("H3");
      pcs.className = "pcs";
      pcs.innerHTML = "Pieces: " + bf_data[i].pieces;
      y.appendChild(z);
      x.appendChild(y);
      dv.appendChild(nme);
      dv.appendChild(pcs);
      y.appendChild(dv);
    }
  }
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}

function figFadeOut(x){
  var opacity = 1;
  var timer = setInterval(function(){
    if(opacity < 0.1){
      clearInterval(timer);
      figFadeIn(x, opacity);
    }
    x.firstElementChild.style.opacity = opacity;
    x.style.opacity = opacity;
    opacity -= 0.1;
  }, 50);
}

function figFadeIn(x, opacity){
  var timer = setInterval(function () {
    if (opacity >= 1){
      clearInterval(timer);
    }
    x.firstElementChild.style.opacity = opacity;
    x.style.opacity = opacity;
    opacity += 0.1;
  }, 50);
}

function motionHeader(card_delay, i, cimg){
  var v;
  do{
    v =  Math.floor(Math.random() * bfm_combo_count);
  }while(v === i);
  let opacity = 1;
  var timer = setInterval(function(){
    if(opacity < 0.1){
      clearInterval(timer);
      cimg.firstElementChild.alt = bfm_combo[v].name;
      cimg.firstElementChild.src = bfm_combo[v].image;
      cimg.style.backgroundColor = bfm_combo[v].background;
      fadeIn("motion-combo", opacity);
    }
    cimg.firstElementChild.style.opacity = opacity;
    cimg.style.opacity = opacity;
    opacity -= 0.1;
  }, 50);
  window.setTimeout(motionHeader, card_delay, card_delay, v, cimg);
}

function motionPage(){
  var cimg = document.getElementById("motion-combo");
  for(j = 0; j < bf_count; j++){
    if(bf_data[j].motion.name != null){
      bfm_combo.push(bf_data[j].motion);
    }
  }
  bfm_combo_count = bfm_combo.length;
  var card_delay = 15000;
  var v =  Math.floor(Math.random() * bfm_combo_count);
  cimg.firstElementChild.alt = bfm_combo[v].name;
  cimg.firstElementChild.src = bfm_combo[v].image;
  cimg.style.backgroundColor = bfm_combo[v].background;
  window.setTimeout(motionHeader, card_delay, card_delay, v, cimg);

  var x = document.querySelector(".motiongallery"); //gallery
  var y; //div
  var z; //img
  var nme; //text
  var pcs; //part count
  for(i = 0; i < bfm_count; i++){
      y = document.createElement("DIV");
      y.className ="container";
      y.style.backgroundColor = bfm_data[i].background;
      y.id = "motion_" + i;
      y.addEventListener("click", function(){ getID(this.id); });
      z = document.createElement("IMG");
      z.alt = bfm_data[i].name;
      z.src = bfm_data[i].image;
      dv = document.createElement("DIV");
      dv.className = "motioninfo";
      nme = document.createElement("H2");
      nme.className = "nme";
      nme.innerHTML = bfm_data[i].name;
      pcs = document.createElement("H3");
      pcs.className = "pcs";
      pcs.innerHTML = "Pieces: " + bfm_data[i].pieces;
      y.appendChild(z);
      x.appendChild(y);
      dv.appendChild(nme);
      dv.appendChild(pcs);
      y.appendChild(dv);
  }
}

function dropDown(){
    if (window.location.href.match('figs.html') != null){
  var x = document.getElementById("dropNav");
  var y = document.getElementById("navbar");
  var z = document.getElementById("dropIcon");

  if (window.innerWidth <= 900 || window.outerWidth <= 900){
    z.insertAdjacentElement("afterend", x);
    z.className = "fa fa-caret-right dropicon";
  }
  else{
    y.appendChild(x);
    z.className = "fa fa-caret-dpwn dropicon";
  }
  if (x.className === "figFilters") {
    x.className += " show";
    if (window.innerWidth <= 900 || window.outerWidth <= 900){
      z.className = "fa fa-caret-left dropicon";
    }
    else{
      z.className = "fa fa-caret-up dropicon";
    }
    console.log("show");
  } else {
    x.className = "figFilters";
    if (window.innerWidth <= 900 || window.outerWidth <= 900){
      z.className = "fa fa-caret-right dropicon";
    }
    else{
      z.className = "fa fa-caret-down dropicon";
    }
    console.log("hide");
  }
  }
}

function updateDropMenu(){
    if (window.location.href.match('figs.html') != null){
  var x = document.getElementById("navbar");
  var y = document.getElementById("dropNav");
  var z = document.getElementById("dropIcon");
  if (window.innerWidth <= 900 || window.outerWidth <= 900){
    z.insertAdjacentElement("afterend", y);
    if(y.classList.contains("show") === true){
      z.className = "fa fa-caret-left dropicon";
    }
    else{
      z.className = "fa fa-caret-right dropicon";
    }
  }
  else{
    x.appendChild(y);
    z.className = "fa fa-caret-down dropicon";
    if(y.classList.contains("show") === true){
      z.className = "fa fa-caret-up dropicon";
    }
    else{
      z.className = "fa fa-caret-down dropicon";
    }
  }
}
}

function scrollToTop(){
  scroll({
    top: 0,
    behavior: "smooth"
  });
}
