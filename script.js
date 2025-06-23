//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];
const imageContainer = document.getElementById("image-container");
const para = document.getElementById("para");
const h = document.getElementById("h");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

let selectedImgs = [];
let imageElements = [];

function shuffleAndRenderImages() {
  // Pick a duplicate randomly
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicateImage = images[duplicateIndex];

  // Create array with one duplicate
  let imageList = [...images, duplicateImage];

  // Shuffle
  imageList.sort(() => 0.5 - Math.random());

  // Clear previous
  imageContainer.innerHTML = "";
  selectedImgs = [];
  imageElements = [];

  // Render shuffled images
  imageList.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.setAttribute("data-class", imgClass);
    img.style.cursor = "pointer";

    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
    imageElements.push(img);
  });

  // Reset messages and buttons
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  para.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
}

function handleImageClick(img) {
  if (selectedImgs.includes(img)) return; // prevent selecting same image again

  if (selectedImgs.length >= 2) return; // limit to 2 selections

  img.classList.add("selected");
  selectedImgs.push(img);

  // Show reset on any selection
  resetBtn.style.display = "inline";

  // Show verify only when 2 selected
  if (selectedImgs.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

resetBtn.addEventListener("click", () => {
  selectedImgs.forEach((img) => img.classList.remove("selected"));
  selectedImgs = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = "";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [img1, img2] = selectedImgs;
  if (img1.getAttribute("data-class") === img2.getAttribute("data-class")) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

shuffleAndRenderImages();
