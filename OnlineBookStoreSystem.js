
// class Book {
//     constructor(id, title, author, price, stockQuantity) {
//         this.id = id;
//         this.title = title;
//         this.author = author;
//         this.price = price;
//         this.stockQuantity = stockQuantity;
//     }

//     getDetails() {
//         return `${this.title} by ${this.author}`;
//     }
// }

// class ShoppingCart {
//     constructor() {
//         this.items = new Map();
//         this.totalAmount = 0;
//     }

//     addItem(book, quantity) {
//         const currentQuantity = this.items.get(book) || 0;
//         this.items.set(book, currentQuantity + quantity);
//         this.calculateTotal();
//         return true;
//     }

//     removeItem(book) {
//         this.items.delete(book);
//         this.calculateTotal();
//     }

//     calculateTotal() {
//         this.totalAmount = Array.from(this.items.entries())
//             .reduce((total, [book, quantity]) => total + book.price * quantity, 0);
//     }

//     clearCart() {
//         this.items.clear();
//         this.totalAmount = 0;
//     }
// }

// // Store state
// const store = {
//     books: [
//         new Book(1, "The JavaScript Way", "John Developer", 29.99, 10),
//         new Book(2, "Python Mastery", "Sarah Coder", 34.99, 15),
//         new Book(3, "Web Design Principles", "Mike Designer", 24.99, 8),
//         new Book(4, "Data Structures", "Alan Algorithm", 39.99, 12),
//         new Book(5, "Machine Learning Basics", "Emma AI", 49.99, 5),
//         new Book(6, "Clean Code", "Robert Martin", 44.99, 20)
//     ],
//     cart: new ShoppingCart(),
    
//     searchBooks(query) {
//         query = query.toLowerCase();
//         return this.books.filter(book => 
//             book.title.toLowerCase().includes(query) ||
//             book.author.toLowerCase().includes(query)
//         );
//     }
// };

// // UI Management
// class UI {
//     static displayBooks(books = store.books) {
//         const grid = document.getElementById('book-grid');
//         grid.innerHTML = '';
        
//         books.forEach(book => {
//             const card = document.createElement('div');
//             card.className = 'book-card';
//             card.innerHTML = `
//                 <div class="book-image">
//                     <i class="fas fa-book fa-3x"></i>
//                 </div>
//                 <div class="book-details">
//                     <h3>${book.title}</h3>
//                     <p>${book.author}</p>
//                     <p class="book-price">$${book.price}</p>
//                     <p>Stock: ${book.stockQuantity}</p>
//                     <button class="btn btn-primary add-to-cart" data-id="${book.id}">
//                         Add to Cart
//                     </button>
//                 </div>
//             `;
//             grid.appendChild(card);
//         });
//     }

//     static updateCart() {
//         const cartItems = document.getElementById('cart-items');
//         const cartTotal = document.getElementById('cart-total');
//         const cartCount = document.getElementById('cart-count');
        
//         cartItems.innerHTML = '';
//         let itemCount = 0;

//         store.cart.items.forEach((quantity, book) => {
//             itemCount += quantity;
//             const item = document.createElement('div');
//             item.className = 'cart-item';
//             item.innerHTML = `
//                 <div>
//                     <h4>${book.title}</h4>
//                     <p>$${book.price} x ${quantity}</p>
//                 </div>
//                 <button class="btn" onclick="UI.removeFromCart(${book.id})">
//                     <i class="fas fa-trash"></i>
//                 </button>
//             `;
//             cartItems.appendChild(item);
//         });

//         cartTotal.textContent = store.cart.totalAmount.toFixed(2);
//         cartCount.textContent = itemCount;
//     }

//     static showToast(message, type = 'success') {
//         const toast = document.getElementById('toast');
//         toast.textContent = message;
//         toast.style.background = `var(--${type})`;
//         toast.classList.add('show');
//         setTimeout(() => toast.classList.remove('show'), 3000);
//     }

//     static addToCart(bookId) {
//         const book = store.books.find(b => b.id === bookId);
//         if (book && book.stockQuantity > 0) {
//             store.cart.addItem(book, 1);
//             book.stockQuantity--;
//             UI.updateCart();
//             UI.displayBooks();
//             UI.showToast(`Added ${book.title} to cart`);
//         }
//     }

//     static removeFromCart(bookId) {
//         const book = store.books.find(b => b.id === bookId);
//         if (book) {
//             const quantity = store.cart.items.get(book) || 0;
//             store.cart.removeItem(book);
//             book.stockQuantity += quantity;
//             UI.updateCart();
//             UI.displayBooks();
//             UI.showToast(`Removed ${book.title} from cart`, 'warning');
//         }
//     }
// }

// // Event Listeners
// document.addEventListener('DOMContentLoaded', () => {
//     UI.displayBooks();

//     // Cart toggle
//     document.getElementById('cart-btn').addEventListener('click', () => {
//         document.getElementById('cart-panel').classList.add('open');
//     });

//     document.getElementById('close-cart').addEventListener('click', () => {
//         document.getElementById('cart-panel').classList.remove('open');
//     });

//     // Search functionality
//     document.getElementById('search-input').addEventListener('input', (e) => {
//         const searchResults = store.searchBooks(e.target.value);
//         UI.displayBooks(searchResults);
//     });

//     // Add to cart buttons
//     document.getElementById('book-grid').addEventListener('click', (e) => {
//         if (e.target.classList.contains('add-to-cart')) {
//             UI.addToCart(Number(e.target.dataset.id));
//         }
//     });

//     // Checkout
//     document.getElementById('checkout-btn').addEventListener('click', () => {
//         if (store.cart.totalAmount > 0) {
//             UI.showToast('Order placed successfully!', 'success');
//             store.cart.clearCart();
//             UI.updateCart();
//         } else {
//             UI.showToast('Cart is empty!', 'warning');
//         }
//     });
// });




// Book Store Management System
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(book) {
        const existingItem = this.items.find(item => item.book.id === book.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ book, quantity: 1 });
        }
    }

    removeItem(bookId) {
        this.items = this.items.filter(item => item.book.id !== bookId);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    get total() {
        return this.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
    }

    clear() {
        this.items = [];
    }
}

class BookStore {
    constructor() {
        this.books = [];
        this.cart = new ShoppingCart();
        this.orders = [];
        this.initializeBooks();
        this.setupEventListeners();
    }

    initializeBooks() {
        this.books = [
            { id: 1, title: "JavaScript: The Good Parts", author: "Douglas Crockford", price: 29.99, stock: 10 },
            { id: 2, title: "Clean Code", author: "Robert C. Martin", price: 34.99, stock: 15 },
            { id: 3, title: "Design Patterns", author: "Gang of Four", price: 39.99, stock: 8 },
            { id: 4, title: "The Pragmatic Programmer", author: "Andy Hunt", price: 44.99, stock: 12 }
        ];
        this.renderBooks();
    }

    setupEventListeners() {
        document.getElementById('cart-toggle')?.addEventListener('click', () => {
            document.getElementById('cart-sidebar')?.classList.add('open');
        });
        
        document.getElementById('close-cart')?.addEventListener('click', () => {
            document.getElementById('cart-sidebar')?.classList.remove('open');
        });
        
        document.getElementById('search-input')?.addEventListener('input', (e) => {
            this.searchBooks(e.target.value);
        });
        
        document.getElementById('checkout-btn')?.addEventListener('click', () => {
            this.processCheckout();
        });
    }

    renderBooks(books = this.books) {
        const grid = document.getElementById('book-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <div class="book-image">
                    <i class="fas fa-book fa-3x"></i>
                </div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p class="book-price">$${book.price.toFixed(2)}</p>
                    <p class="stock-info">In Stock: ${book.stock}</p>
                </div>
                <button class="btn btn-primary" onclick="bookStore.addToCart(${book.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            `;
            grid.appendChild(card);
        });
    }

    addToCart(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book && book.stock > 0) {
            this.cart.addItem(book);
            book.stock--;
            this.renderBooks();
            this.showToast(`Added "${book.title}" to cart`);
            this.updateCartUI();
        }
    }

    searchBooks(query) {
        const filteredBooks = this.books.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        this.renderBooks(filteredBooks);
    }

    updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-count');
        
        if (!cartItems || !cartTotal || !cartCount) return;
        
        cartItems.innerHTML = '';
        this.cart.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <h4>${item.book.title}</h4>
                    <p>$${item.book.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="btn btn-outline" onclick="bookStore.removeFromCart(${item.book.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `$${this.cart.total.toFixed(2)}`;
        cartCount.textContent = this.cart.getTotalItems();
    }

    removeFromCart(bookId) {
        this.cart.removeItem(bookId);
        this.renderBooks();
        this.updateCartUI();
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    processCheckout() {
        if (this.cart.items.length === 0) {
            this.showToast('Your cart is empty');
            return;
        }
        
        this.orders.push({ orderId: Date.now(), items: [...this.cart.items] });
        this.cart.clear();
        this.updateCartUI();
        this.showToast('Order placed successfully!');
    }
}

const bookStore = new BookStore();
