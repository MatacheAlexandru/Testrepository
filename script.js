document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".title");

  titles.forEach((title) => {
    title.addEventListener("click", function () {
      const contentId = this.getAttribute("onclick").match(/'(.*?)'/)[1];
      const section = document.getElementById(contentId);

      // Toggle visibility of the content
      section.classList.toggle("visible");

      // Obține SVG-ul din titlul pe care s-a dat click
      const svg = this.querySelector("svg");
      // Schimbă clasa "rotated"
      svg.classList.toggle("rotated");
    });
  });
});
