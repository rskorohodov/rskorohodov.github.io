
// swiper tasks
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    567: {
      slidesPerView: 1,

    },
    768: {
      slidesPerView: 2,

    },
    992: {
      slidesPerView: 3,

    },
    1170: {
      slidesPerView: 3,

    },
    1171: {
      slidesPerView: 4,

    }
  }
});

// swiper prices
var swiperPrice = new Swiper(".priceSwiper", {
  breakpoints: {
    567: {
      slidesPerView: 1,

    },
    768: {
      slidesPerView: 5,

    },
    992: {
      slidesPerView: 5,

    },
    1170: {
      slidesPerView: 5,

    },
    1171: {
      slidesPerView: 5,

    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// accordion start
function findElements(object, element) {
  const instance = object;
  instance.element = element;
  instance.target = element.nextElementSibling;
}

function hideElement(object) {
  const instance = object;
  const { target } = instance;
  target.style.height = null;
  instance.isActive = false;
}

function showElement(object) {
  const instance = object;
  const { target, height } = instance;
  target.style.height = `max-content`;
  instance.isActive = true;
}

function changeElementStatus(instance) {
  if (instance.isActive) {
    hideElement(instance);
  } else {
    showElement(instance);
  }
}

function measureHeight(object) {
  const instance = object;
  instance.height = object.target.firstElementChild.clientHeight;
}

function subscribe(instance) {
  instance.element.addEventListener('click', (event) => {
    event.preventDefault();
    changeElementStatus(instance);
  });
  window.addEventListener('resize', () => measureHeight(instance));
}

function activeToggler(element) {
  element.addEventListener('click',
    () => {
      element.classList.toggle('active')
      element.querySelector('.question__trigger').classList.toggle('active')
    }
  )
}

function accordion(element) {
  const instance = {};

  function init() {
    findElements(instance, element);
    measureHeight(instance);
    subscribe(instance);
    activeToggler(element)
  }

  init();
}

const elements = [...document.querySelectorAll('.js-accordion')];
elements.forEach(accordion);
// accordion end


// burger menu start
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')

if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('lock')
    iconMenu.classList.toggle('active')
    menuBody.classList.toggle('active')
  })
}

const menuLinks = document.querySelectorAll(".menu__link[data-goto]")
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

      if (iconMenu.classList.contains('active')) {
        document.body.classList.remove('lock')
        iconMenu.classList.remove('active')
        menuBody.classList.remove('active')
      }
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      })
      e.preventDefault()
    }
  }
}
// burger menu end
