const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-panel img");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".filter-info .value");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  sepia = 0,
  blur = 0,
  opacity = 100,
  contrast = 100;

const applyFilters = () => {
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px) opacity(${opacity}%) contrast(${contrast}%)`;
};
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
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

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
