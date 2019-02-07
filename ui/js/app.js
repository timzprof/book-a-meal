let overlay = document.querySelector('.overlay');
let orderBtns = document.querySelectorAll('.order-btn');

let redirect = (location) => {
  window.location.href = location + '.html';
}

iziToast.settings({
  timeout: 1500,
  resetOnHover: true,
});

if(orderBtns !== null) {
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

let loginForm = document.getElementById('loginForm');

if(loginForm !== null) {
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

let registerForm = document.getElementById('registerForm');

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

let makeOrderBtn = document.getElementById('makeOrder');

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