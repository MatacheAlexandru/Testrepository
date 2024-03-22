document.getElementById("menuButton").addEventListener("click", function() {
  var dropdown = document.getElementById("dropdownContent");
  dropdown.classList.toggle("show");
  
  var icon = document.getElementById("menuIcon");
  icon.classList.toggle("rotate");
});