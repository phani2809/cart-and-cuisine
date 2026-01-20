let slideIndex1=0;
showSlide();

function showSlide() {
  let i;
  let slide = document.getElementsByClassName("Slides");
  for (i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";  
  }
  slideIndex1++;
  if (slideIndex1 > slide.length) {slideIndex1 = 1}    
  slide[slideIndex1-1].style.display = "block";  
  setTimeout(showSlide,3500); // Change image every 2 seconds
}
