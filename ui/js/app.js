const overlay = document.querySelector('.overlay');
const mobileMenu = document.querySelector('.mobile-menu');

const redirect = location => {
  window.location.href = `${location}.html`;
};

 */
const toggleMobileNav = () => {
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav.classList.contains('hide')) {
    overlay.classList.remove('hide');
    mobileMenu.classList.add('open');
  } else {
    overlay.classList.add('hide');
    mobileMenu.classList.remove('open');
  }
  mobileNav.classList.toggle('hide');
};

iziToast.settings({
  timeout: 1500,
  resetOnHover: true
});

overlay.addEventListener("click", () => {
  const mobileNav = document.querySelector('.mobile-nav');
  if (!mobileNav.classList.contains("hide")) {
    toggleMobileNav();
  }
});

mobileMenu.addEventListener("click", toggleMobileNav);

const orderBtns = document.querySelectorAll('.order-btn');

if (orderBtns !== null) {
  orderBtns.forEach(orderBtn => {
    orderBtn.addEventListener("click", () => {
      let modal = document.querySelector('#orderQuantityModal');
      toggleModal(modal);
    });
  });
}

const addToOrdersForm = document.getElementById('addToOrders');

if(addToOrdersForm !== null) {
  addToOrdersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let modal = document.getElementById(addToOrdersForm.parentElement.parentElement.parentElement.id);
    toggleModal(modal);
    overlay.classList.remove('hide');
    iziToast.show({
      color: "green",
      icon: "ico-success",
      title: "Success",
      message: "Adding to Orders..",
      position: "center",
      onClosing: () => {
        redirect("orders");
      }
    });
  });
}

const checkoutForm = document.getElementById('checkoutForm');

if(checkoutForm !== null) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let modal = document.getElementById(checkoutForm.parentElement.parentElement.parentElement.id);
    toggleModal(modal);
    overlay.classList.remove('hide');
    iziToast.show({
      color: "green",
      icon: "ico-success",
      title: "Success",
      message: "Checking Out..",
      position: "center",
      onClosing: () => {
        redirect("index");
      }
    });
  });
}

const deleteBtns = document.querySelectorAll('.delete-btn');

if (deleteBtns !== null) {
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", () => {
      overlay.classList.remove("hide");
      iziToast.show({
        color: "green",
        icon: "ico-success",
        title: "Success",
        message: "Item Deleted..",
        position: "center",
        onClosing: () => {
          redirect("orders");
        }
      });
    });
  });
}

const loginForm = document.getElementById('loginForm');

if (loginForm !== null) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    overlay.classList.remove("hide");
    iziToast.show({
      color: "green",
      icon: "ico-success",
      title: "Success",
      message: "Logging In..",
      position: "center",
      onClosing: () => {
        redirect("index");
      }
    });
  });
}

const registerForm = document.getElementById('registerForm');

if (registerForm !== null) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    overlay.classList.remove("hide");
    iziToast.show({
      color: "green",
      icon: "ico-success",
      title: "Success",
      message: "Registration Done..",
      position: "center",
      onClosing: () => {
        redirect("index");
      }
    });
  });
}

const toggleModal = modal => {
  overlay.classList.toggle('hide');
  modal.classList.toggle("hidden");
};

const modalToggles = document.querySelectorAll('[data-toggle="modal"]');

if (modalToggles !== null) {
  modalToggles.forEach(modalToggle => {
    let modal = document.querySelector(modalToggle.dataset.target);
    modalToggle.addEventListener('click', () => toggleModal(modal));
  });
}

let dismissModalBtns = document.querySelectorAll('[data-dismiss="modal"]');

dismissModalBtns.forEach(dismissBtn => {
  let modal = document.getElementById(dismissBtn.parentElement.parentElement.parentElement.id);
  dismissBtn.addEventListener('click', () => toggleModal(modal));
});

const mealOptionForm = document.getElementById('addMealOption');

if (mealOptionForm !== null) {
  mealOptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toggleModal(mealOptionForm.parentElement.parentElement.parentElement);
    overlay.classList.remove("hide");
    iziToast.show({
      color: "green",
      icon: "ico-success",
      title: "Success",
      message: "Meal Option Added",
      position: "center",
      onClosing: () => {
        redirect("meal-options");
      }
    });
  });
}
