const overlay = document.querySelector('.overlay');
const mobileMenu = document.querySelector('.mobile-menu');

const redirect = location => {
  window.location.href = `${location}.html`;
};

const toggleMobileNav = () => {
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav.classList.contains('hide')) {
    overlay.classList.remove('hide');
    mobileMenu.innerHTML = '&#9747;';
  } else {
    overlay.classList.add('hide');
    mobileMenu.innerHTML = '&#9776;';
  }
  mobileNav.classList.toggle('hide');
};

iziToast.settings({
  timeout: 1500,
  resetOnHover: true,
});

overlay.addEventListener('click', toggleMobileNav);

mobileMenu.addEventListener('click', toggleMobileNav);

const orderBtns = document.querySelectorAll('.order-btn');

if (orderBtns !== null) {
  orderBtns.forEach(orderBtn => {
    orderBtn.addEventListener('click', () => {
      overlay.classList.remove('hide');
      iziToast.show({
        color: 'green',
        icon: 'ico-success',
        title: 'Success',
        message: 'Adding to Cart..',
        position: 'center',
        onClosing: () => {
          redirect('cart');
        }
      });
    });
  });
}

const deleteBtns = document.querySelectorAll('.delete-btn');

if (deleteBtns !== null) {
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () => {
      overlay.classList.remove('hide');
      iziToast.show({
        color: 'green',
        icon: 'ico-success',
        title: 'Success',
        message: 'Item Deleted..',
        position: 'center',
        onClosing: () => {
          redirect('cart');
        }
      });
    });
  });
}

const loginForm = document.getElementById('loginForm');

if (loginForm !== null) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    overlay.classList.remove('hide');
    iziToast.show({
      color: 'green',
      icon: 'ico-success',
      title: 'Success',
      message: 'Logging In..',
      position: 'center',
      onClosing: () => {
        redirect('index');
      }
    });
  });
}

const registerForm = document.getElementById('registerForm');

if (registerForm !== null) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    overlay.classList.remove('hide');
    iziToast.show({
      color: 'green',
      icon: 'ico-success',
      title: 'Success',
      message: 'Registration Done..',
      position: 'center',
      onClosing: () => {
        redirect('index');
      }
    });
  });
}

const makeOrderBtn = document.getElementById('makeOrder');

if (makeOrderBtn !== null) {
  makeOrderBtn.addEventListener('click', () => {
    overlay.classList.remove('hide');
    iziToast.show({
      color: 'green',
      icon: 'ico-success',
      title: 'Success',
      message: 'Order Made',
      position: 'center',
      onClosing: () => {
        redirect('index');
      }
    });
  });
}
