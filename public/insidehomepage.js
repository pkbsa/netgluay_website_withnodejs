/* First Version

function reset(){
  for (var i = 0; i < btns2.length; i++) {
    var current2 = document.getElementsByClassName("btn2");
    current2[i].className = current2[i].className.replace(" active2", "");
  }
}
function toppage(c){
  filterFirst1(c);
  var btnContainer2 = document.getElementById("myBtnContainer2");
  var btns2 = btnContainer2.getElementsByClassName("btn2");
  if(c == "movies"){
    reset();
    btns2[0].className += " active2";
  }
  if(c == "series"){
    reset();
    btns2[1].className += " active2";
  }
  if(c == "watch"){
    reset();
    btns2[3].className += " active2";
  }
}  */

/* Universal class */
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}
/******************/

/* Above Button */
var first, second, third;

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show") ;;
  }
}
function filterFirst(c){
  first = c;
  filterSelection(c)
  var btnContainer1 = document.getElementById("myBtnContainer1");
  var btns1 = btnContainer1.getElementsByClassName("btn1");
  for (var i = 0; i < btns1.length; i++) {
      var current1 = document.getElementsByClassName("active1");
      var all1 = document.getElementsByClassName("all");
      current1[0].className = current1[0].className.replace(" active1", "");
      btns1[0].className += " active1";
  }
}
function filterSecond(c){
  second = ""
  tmp = c;
  second = first.concat(" ");
  second = second.concat(tmp);
  if(c == "all"){
    filterSelection(first);
    console.log(first);
  } else{
    filterSelection(second);
    console.log(second);
  }
}
// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
var btnContainer1 = document.getElementById("myBtnContainer1");
var btns1 = btnContainer1.getElementsByClassName("btn1");
for (var i = 0; i < btns1.length; i++) {
  btns1[i].addEventListener("click", function(){
    var current1 = document.getElementsByClassName("active1");
    current1[0].className = current1[0].className.replace(" active1", "");
    this.className += " active1";
  });
}
/******************/

/* Below Button */
var first1, second1, third1;

function filterSelection1(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv1");
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show") ;;
  }
}
function filterFirst1(c){
  first1 = c;
  filterSelection1(c)
  var btnContainer3 = document.getElementById("myBtnContainer3");
  var btns3 = btnContainer3.getElementsByClassName("btn3");
  for (var i = 0; i < btns3.length; i++) {
      var current3 = document.getElementsByClassName("active3");
      var all3 = document.getElementsByClassName("all1");
      current3[0].className = current3[0].className.replace(" active3", "");
      btns3[0].className += " active3";
  }
  console.log(first1);
}
function filterSecond1(c){
  second1 = ""
  tmp = c;
  second1 = first1.concat(" ");
  second1 = second1.concat(tmp);
  if(c == "all1"){
    filterSelection1(first1);
    console.log(first1);
  } else{
    filterSelection1(second1);
    console.log(second1);
  }
}
// Add active class to the current button (highlight it)
var btnContainer2 = document.getElementById("myBtnContainer2");
var btns2 = btnContainer2.getElementsByClassName("btn2");
for (var i = 0; i < btns2.length; i++) {
  btns2[i].addEventListener("click", function(){
    var current2 = document.getElementsByClassName("active2");
    current2[0].className = current2[0].className.replace(" active2", "");
    this.className += " active2";
  });
}
var btnContainer3 = document.getElementById("myBtnContainer3");
var btns3 = btnContainer3.getElementsByClassName("btn3");
for (var i = 0; i < btns3.length; i++) {
  btns3[i].addEventListener("click", function(){
    var current3 = document.getElementsByClassName("active3");
    current3[0].className = current3[0].className.replace(" active3", "");
    this.className += " active3";
  });
}
/******************/

filterFirst("trend")
filterFirst1("movies")
