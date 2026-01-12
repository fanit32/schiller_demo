document.addEventListener("DOMContentLoaded", () => {
  // Burger Menu Logic
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Video Modal Logic
  const openVideo = document.getElementById('open-video');
  const closeVideo = document.getElementById('close-video');
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-iframe');
  const videoUrl = "https://player.vimeo.com/video/123421803?autoplay=1";

  if (openVideo) {
    openVideo.addEventListener('click', () => {
      videoIframe.src = videoUrl;
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevents background scroll
    });
  }

  const closeModal = () => {
    videoIframe.src = "";
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeVideo) {
    closeVideo.addEventListener('click', closeModal);
  }

  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Scroll Reveal
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // Smooth Scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Combined scroll handler for parallax and header effects
  const heroImg = document.querySelector(".hero-bg img");
  const header = document.querySelector(".header");
  
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    
    // Parallax effect for the hero background
    if (heroImg) {
      heroImg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
    
    // Header scroll effect
    if (header) {
      if (scrolled > 50) {
        header.style.padding = "10px 0";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
      } else {
        header.style.padding = "15px 0";
        header.style.boxShadow = "none";
      }
    }
  });

  // New Slider Logic - Simple and Reliable
  const track = document.getElementById('slider-track');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
    
    // Button events
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
  }
});
