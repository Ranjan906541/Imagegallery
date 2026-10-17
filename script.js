
const images = [
  {
    title: "Mountain Escape",
    category: "nature",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Green Forest",
    category: "nature",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Ocean Dreams",
    category: "travel",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "City Lights",
    category: "cities",
    url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Golden Sunset",
    category: "nature",
    url: "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Cute Puppy",
    category: "animals",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Wildlife Beauty",
    category: "animals",
    url: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Beautiful Waterfall",
    category: "travel",
    url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Modern City",
    category: "cities",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85"
  }
];

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const previewImage = document.getElementById("previewImage");
const previewTitle = document.getElementById("previewTitle");
const previewCounter = document.getElementById("previewCounter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [...images];
let currentIndex = 0;
let lastFocusedElement = null;

// Display gallery images
function displayImages(items) {
  galleryGrid.innerHTML = "";

  if (items.length === 0) {
    galleryGrid.textContent = "No images found.";
    return;
  }

  items.forEach((image, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.title;
    img.loading = "lazy";

    const caption = document.createElement("div");
    caption.className = "card-caption";

    const title = document.createElement("h3");
    title.textContent = image.title;

    const category = document.createElement("p");
    category.textContent = image.category;

    caption.append(title, category);
    card.append(img, caption);

    card.addEventListener("click", () => {
      openLightbox(index);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(card);
  });
}

// Filter by category
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.filter;

    currentImages =
      category === "all"
        ? [...images]
        : images.filter((image) => image.category === category);

    displayImages(currentImages);
  });
});

// Open large image preview
function openLightbox(index) {
  currentIndex = index;
  lastFocusedElement = document.activeElement;

  updateLightbox();

  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  closeBtn.focus();
}

// Update image and counter
function updateLightbox() {
  const image = currentImages[currentIndex];

  previewImage.src = image.url;
  previewImage.alt = image.title;
  previewTitle.textContent = image.title;
  previewCounter.textContent =
    `${currentIndex + 1} / ${currentImages.length}`;
}

// Previous image
function showPrevious() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) %
    currentImages.length;

  updateLightbox();
}

// Next image
function showNext() {
  currentIndex =
    (currentIndex + 1) % currentImages.length;

  updateLightbox();
}

// Close preview
function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  previewImage.removeAttribute("src");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

prevBtn.addEventListener("click", showPrevious);
nextBtn.addEventListener("click", showNext);
closeBtn.addEventListener("click", closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    showPrevious();
  } else if (event.key === "ArrowRight") {
    showNext();
  }
});

// Initial gallery
displayImages(images);