


var GUI = document.getElementById("gui");
var MODAL = document.getElementById("modal");
var isModalOpen = true;

/*
document.getElementById("gui").onmouseout = function(event) {
  console.log("AFUERA");
};
document.getElementById("gui").onmouseover = function(event) {
  console.log("ADENTRO");
};*/

// Show modal when the page loads
window.onload = function() {
  showModal();
};

function showModal() {
  MODAL.style.display = "flex";
  isModalOpen = true;
}

function closeModal() {
  MODAL.style.display = "none";
  isModalOpen = false;
}

function openGui(){
	console.log("ABRIR GUI");
	document.getElementById("gui").style.display = "block";
	document.getElementById("opengui").style.display = "none";
	isRandomValues = false;
}

function closeGui(){
	console.log("CERRAR GUI");
	document.getElementById("gui").style.display = "none";
	document.getElementById("opengui").style.display = "block";
}


$("#gui").mouseover(function() {
  //console.log("ENTRA PLIS");
  isOverGui = true;
});

$("#gui").mouseleave(function() {
 // console.log("SALE PLIS");
  isOverGui = false;
});

// Touch events for mobile
$("#gui").on("touchstart", function() {
  isOverGui = true;
});

$("#gui").on("touchend", function() {
  // Keep isOverGui true to prevent accidental drawing when touching GUI elements
  setTimeout(function() {
    if (!$.contains(document.getElementById("gui"), document.activeElement)) {
      isOverGui = false;
    }
  }, 100);
});