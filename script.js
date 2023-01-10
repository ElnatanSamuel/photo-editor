const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-panel img");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".filter-info .value");
const rotateOptions = document.querySelectorAll(".rotate button");
const resetFilterBtn = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");
const previewPanel = document.querySelector(".preview-panel");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  sepia = 0,
  blur = 0,
  opacity = 100,
  contrast = 100;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px) opacity(${opacity}%) contrast(${contrast}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    document.querySelector(".preview-panel img").classList.add("img-preview");
    resetFilterBtn.click();
    document.querySelector(".editor-panel").classList.remove("dont-show");
    document.querySelector(".save-img").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${filterSlider.value}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${filterSlider.value}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${filterSlider.value}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${filterSlider.value}%`;
    } else if (option.id === "sepia") {
      filterSlider.max = "100";
      filterSlider.value = sepia;
      filterValue.innerText = `${filterSlider.value}%`;
    } else if (option.id === "blur") {
      filterSlider.max = "10";
      filterSlider.value = blur;
      filterValue.innerText = `${filterSlider.value}%`;
    } else if (option.id === "opacity") {
      filterSlider.max = "100";
      filterSlider.value = opacity;
      filterValue.innerText = `${filterSlider.value}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = contrast;
      filterValue.innerText = `${filterSlider.value}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;

  const selectedFilter = document.querySelector(".filter .active");
  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === "grayscale") {
    grayscale = filterSlider.value;
  } else if (selectedFilter.id === "sepia") {
    sepia = filterSlider.value;
  } else if (selectedFilter.id === "blur") {
    blur = filterSlider.value;
  } else if (selectedFilter.id === "opacity") {
    opacity = filterSlider.value;
  } else {
    contrast = filterSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id == "left") {
      rotate -= 90;
    } else if (option.id == "right") {
      rotate += 90;
    } else if (option.id == "horizontal") {
      flipVertical = flipVertical == 1 ? -1 : 1;
    } else {
      flipHorizontal = flipHorizontal == 1 ? -1 : 1;
    }

    applyFilters();
  });
});

const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  sepia = 0;
  blur = 0;
  opacity = 100;
  contrast = 100;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  applyFilters();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px) opacity(${opacity}%) contrast(${contrast}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);

  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  //   document.body.appendChild(canvas);

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
