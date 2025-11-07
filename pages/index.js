import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CATEGORIES, PRODUCTS, LANG } from '../data';

export default function Home() {
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [lang, setLang] = useState('ru');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const t = LANG[lang];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.headerColor = '#FFFFFF';
    }
  }, []);

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert(t.selectSizeColor);
      return;
    }

    const item = {
      ...selectedProduct,
      selectedSize,
      selectedColor,
      cartId: Date.now()
    };
    setCart([...cart, item]);
    setView('cart');
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  // Home - категории
  const HomeView = () => (
    <div className="pb-20">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{t.categories}</h2>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(category => (
            <div 
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setView('catalog');
              }}
              className="ploom-card cursor-pointer relative"
            >
              <img 
                src={category.image} 
                alt={t[category.id] || category.name}
                className="category-image"
              />
              <div className="p-4 flex items-center justify-between">
                <span className="font-medium">{t[category.id] || category.name}</span>
                <span className="text-gray-400">→</span>
              </div>
              {category.badge && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  {category.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Catalog - товары категории
  const CatalogView = () => {
    const filteredProducts = PRODUCTS.filter(p => p.category === selectedCategory);
    
    return (
      <div className="pb-20">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setView('home')} className="text-2xl">←</button>
            <h2 className="text-2xl font-bold">{t.catalog}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedSize(null);
                  setSelectedColor(null);
                  setCurrentImageIndex(0);
                  setView('product');
                }}
                className="ploom-card cursor-pointer"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{product.price.toLocaleString()} ₸</span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {product.oldPrice.toLocaleString()} ₸
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Product - карточка товара
  const ProductView = () => {
    if (!selectedProduct) return null;

    const handleSwipe = (e) => {
      const scrollLeft = e.target.scrollLeft;
      const imageWidth = e.target.offsetWidth;
      const newIndex = Math.round(scrollLeft / imageWidth);
      setCurrentImageIndex(newIndex);
    };

    return (
      <div className="pb-20">
        <div className="p-4">
          <button onClick={() => setView('catalog')} className="text-2xl mb-4">←</button>
        </div>

        {/* Свайпер изображений */}
        <div className="relative mb-4">
          <div 
            className="image-swiper"
            onScroll={handleSwipe}
          >
            {selectedProduct.images.map((img, idx) => (
              <div key={idx} style={{ minWidth: '100%', scrollSnapAlign: 'start' }}>
                <img 
                  src={img} 
                  alt={selectedProduct.name}
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          
          {/* Индикаторы */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
            {selectedProduct.images.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: idx === currentImageIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: idx === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold">{selectedProduct.price.toLocaleString()} ₸</span>
            {selectedProduct.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                {selectedProduct.oldPrice.toLocaleString()} ₸
              </span>
            )}
          </div>

          {/* Размеры */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">{t.size}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Цвета */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">{t.color}</h3>
            <div className="flex gap-2">
              {selectedProduct.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`color-button ${selectedColor?.name === color.name ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: color.hex,
                    border: color.hex === '#FFFFFF' ? '2px solid #E5E5E5' : undefined
                  }}
                />
              ))}
            </div>
            {selectedColor && (
              <p className="text-sm text-gray-600 mt-2">{selectedColor.name}</p>
            )}
          </div>

          {/* Описание */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">{t.description}</h3>
            <p className="text-gray-700">{selectedProduct.description}</p>
          </div>

          {/* Кнопка добавить */}
          <button
            onClick={addToCart}
            className="fixed-bottom-button"
            style={{ marginBottom: '20px' }}
          >
            {t.addToCart}
          </button>
        </div>
      </div>
    );
  };

  // Cart - корзина
  const CartView = () => {
    if (cart.length === 0) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold mb-2">{t.cartEmpty}</h2>
          <button
            onClick={() => setView('home')}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium"
          >
            {t.goShopping}
          </button>
        </div>
      );
    }

    return (
      <div style={{ paddingBottom: '120px' }}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{t.cart}</h2>
          
          {cart.map((item) => (
            <div key={item.cartId} className="cart-item flex gap-3">
              <img 
                src={item.images[0]} 
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <div className="text-sm text-gray-500 mb-2">
                  <div>{t.size}: {item.selectedSize}</div>
                  <div>{t.color}: {item.selectedColor.name}</div>
                </div>
                <div className="font-bold">{item.price.toLocaleString()} ₸</div>
              </div>
              <button
                onClick={() => removeFromCart(item.cartId)}
                className="text-red-500 self-start"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Итого */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg">{t.total}:</span>
            <span className="text-2xl font-bold">{getTotalPrice().toLocaleString()} ₸</span>
          </div>
          <button
            onClick={() => setView('checkout')}
            className="fixed-bottom-button"
          >
            {t.checkout}
          </button>
        </div>
      </div>
    );
  };

  // Checkout - оформление
  const CheckoutView = () => {
    const [form, setForm] = useState({
      name: '',
      phone: '',
      address: '',
      comment: ''
    });

    const handleSubmit = async () => {
      if (!form.name || !form.phone || !form.address) {
        alert('Заполните все обязательные поля');
        return;
      }

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: form,
            items: cart,
            total: getTotalPrice()
          })
        });

        if (response.ok) {
          alert('✅ Заказ оформлен! Мы свяжемся с вами.');
          setCart([]);
          setView('home');
        }
      } catch (error) {
        console.error(error);
        alert('Ошибка при оформлении заказа');
      }
    };

    return (
      <div className="pb-32">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView('cart')} className="text-2xl">←</button>
            <h2 className="text-2xl font-bold">Оформление заказа</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Телефон *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Адрес доставки *</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Город, улица, дом, квартира"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Комментарий</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({...form, comment: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Дополнительная информация"
              />
            </div>

            {/* Заказ */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold mb-3">{t.yourOrder}</h3>
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 text-sm">
                  <span>{item.name} ({item.selectedSize})</span>
                  <span className="font-semibold">{item.price.toLocaleString()} ₸</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>{t.total}:</span>
                <span>{getTotalPrice().toLocaleString()} ₸</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="fixed-bottom-button"
            >
              {t.confirmOrder}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Profile
  const ProfileView = () => (
    <div className="pb-20 p-4">
      <h2 className="text-2xl font-bold mb-6">{t.profile}</h2>
      
      <div className="bg-white rounded-xl p-4 flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
          👤
        </div>
        <div>
          <div className="font-bold text-lg">Пользователь</div>
          <div className="text-gray-600">+7 777 123 4567</div>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        {[
          { icon: '📦', label: t.myOrders },
          { icon: '❤️', label: t.favorites },
          { icon: '⚙️', label: t.settings },
          { icon: '💬', label: t.support }
        ].map((item, idx) => (
          <div key={idx} className="p-4 border-b last:border-b-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Нижняя навигация
  const BottomNav = () => (
    <div className="bottom-nav">
      {[
        { id: 'home', label: t.home, icon: '🏠' },
        { id: 'catalog', label: t.catalog, icon: '📱' },
        { id: 'cart', label: t.cart, icon: '🛒', badge: cart.length },
        { id: 'profile', label: t.profile, icon: '👤' }
      ].map(item => (
        <button
          key={item.id}
          onClick={() => {
            setView(item.id);
            if (item.id === 'catalog' && !selectedCategory) {
              setSelectedCategory('men');
            }
          }}
          className={`nav-item ${view === item.id ? 'active' : ''}`}
        >
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            {item.badge > 0 && (
              <span className="badge">{item.badge}</span>
            )}
          </div>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>Fashion Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </Head>

      <div>
        {view === 'home' && <HomeView />}
        {view === 'catalog' && <CatalogView />}
        {view === 'product' && <ProductView />}
        {view === 'cart' && <CartView />}
        {view === 'checkout' && <CheckoutView />}
        {view === 'profile' && <ProfileView />}
        
        <BottomNav />
      </div>
    </>
  );
}
