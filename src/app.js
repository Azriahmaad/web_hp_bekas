document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
      items: [ 
       { id: 1, name: 'Samsung S24 Ultra', img: '1.jpg', price: 20000000 },
       { id: 2, name: 'Samsung S24', img: '2.jpeg', price: 12000000 },
       { id: 3, name: 'Iphone 16', img: '3.jpeg', price: 38000000 },
       { id: 4, name: 'Iphone 15 Pro', img: '4.jpeg', price: 18000000 },
       { id: 5, name: 'Iphone 14 Pro', img: '5.jpeg', price: 15000000 },
    ],
    }));

   
    
    Alpine.store('cart', {  //state managment
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada / cart masih kosong
            if(!cartItem){
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else{
                // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if( item.id !== newItem.id) {
                        return item;
                    } else{
                        // jika barang sudah ada, tambah quantity dan subtotalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += newItem.price;
                        return item; 
                    };
                });
            };
        },
        remove(id) {
            // ambil item yang mau diremove berdasarkan idnya    
            const cartItem = this.items.find((item) => item.id === id);
            // jika item lebih dari 1
            if(cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.total -= item.price;
                        return item;
                    };
                });
            } else if(cartItem.quantity === 1) {
                // jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id)
                this.quantity--;
                this.total -= cartItem.price;
            };  
        }
    });
});

// form validation
const checkoutbButton = document.querySelector('.checkout-button');
checkoutbButton.disabled = true;

const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.length; i++) {
        if( form.elements[i].value.length !== 0) {
            checkoutbButton.classList.remove('disabled');
            checkoutbButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutbButton.disabled = false;
    checkoutbButton.classList.remove('disabled');
});

// kirim data ketika checkout button diklik
checkoutbButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    
    // ini manual yang makan tetuju whatsapp yang tertera lalu kita bikin sendiri payment linknya
    const message = formatMessage(objData);
    window.open('http://wa.me/087795484882?text=' + encodeURIComponent(message));
    // console.log(objData);

    
    // minta transaction token menggunakan ajax / fetch
    // try{
    //     const response = await fetch('php/placeOrder.php', {
            
    //     });
       
    // } catch(err) {
    //     console.log(err.message);
    // }

});

// format pesan whatsapp
const formatMessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No Hp: ${obj.phone}
    Data pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`)}
    TOTAL: ${rupiah(obj.total)}
    Terima kasih.`;
};


// Konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID',{
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
