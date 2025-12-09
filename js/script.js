const navbarNav = document.querySelector('.navbar-nav')

// Ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active')
}

// klik di luar elemen untuk menghilangkan class active
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active')
    }
})

const searchForm = document.querySelector('.search-form')
const seachBox = document.querySelector('#search-box')

// Search button diklik
document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    seachBox.focus();
    e.preventDefault();
}

// klik di luar elemen untuk menghilangkan class active
const searchButton = document.querySelector('#search-button');

document.addEventListener('click', function(e){
    if(!searchButton.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active')
    }
})


const shoppingCart = document.querySelector('.shopping-cart')

// Shopping cart diklik
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

// klik di luar elemen untuk menghilangkan class active
const shoppingCartButton = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function(e){
    if(!shoppingCartButton.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active');
    };
});

// Modal Button diklik
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
})

// Klil tombol close
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
      itemDetailModal.style.display = 'none';
    }
  };