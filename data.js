// ТОЧНАЯ КОПИЯ ДАННЫХ ИЗ ОРИГИНАЛЬНОГО ФАЙЛА

export const CATEGORIES = [
  {
    id: 'men',
    name: 'Мужское',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&h=300&fit=crop'
  },
  {
    id: 'women',
    name: 'Женское',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop'
  },
  {
    id: 'kids',
    name: 'Детское',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=300&fit=crop'
  },
  {
    id: 'shoes',
    name: 'Обувь',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop'
  },
  {
    id: 'accessories',
    name: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=300&fit=crop'
  },
  {
    id: 'sale',
    name: 'Распродажа',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    badge: '-50%'
  }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Футболка оверсайз',
    price: 5990,
    oldPrice: 7990,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Черный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Серый', hex: '#9CA3AF' }
    ],
    description: 'Удобная футболка из хлопка. Оверсайз крой, свободная посадка.'
  },
  {
    id: 2,
    name: 'Джинсы slim fit',
    price: 12990,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&h=800&fit=crop'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Синий', hex: '#1E40AF' },
      { name: 'Черный', hex: '#000000' }
    ],
    description: 'Классические джинсы slim fit. 98% хлопок, 2% эластан.'
  },
  {
    id: 3,
    name: 'Платье миди',
    price: 8990,
    oldPrice: 12990,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Красный', hex: '#EF4444' },
      { name: 'Черный', hex: '#000000' }
    ],
    description: 'Элегантное платье длины миди. Подходит для любого случая.'
  },
  {
    id: 4,
    name: 'Кроссовки',
    price: 15990,
    category: 'shoes',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Черный', hex: '#000000' }
    ],
    description: 'Универсальные кроссовки для повседневной носки.'
  },
  {
    id: 5,
    name: 'Рюкзак городской',
    price: 6990,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=800&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Черный', hex: '#000000' },
      { name: 'Серый', hex: '#6B7280' },
      { name: 'Синий', hex: '#3B82F6' }
    ],
    description: 'Вместительный рюкзак для города. Отделение для ноутбука до 15".'
  },
  {
    id: 6,
    name: 'Детская куртка',
    price: 9990,
    oldPrice: 14990,
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=800&fit=crop'
    ],
    sizes: ['98', '104', '110', '116', '122'],
    colors: [
      { name: 'Красный', hex: '#EF4444' },
      { name: 'Синий', hex: '#3B82F6' },
      { name: 'Зеленый', hex: '#10B981' }
    ],
    description: 'Теплая куртка для детей. Водоотталкивающая ткань.'
  }
];

export const LANG = {
  ru: {
    categories: 'Категории',
    men: 'Мужское',
    women: 'Женское',
    kids: 'Детское',
    shoes: 'Обувь',
    accessories: 'Аксессуары',
    sale: 'Распродажа',
    size: 'Размер',
    color: 'Цвет',
    description: 'Описание',
    addToCart: 'Добавить в корзину',
    cart: 'Корзина',
    cartEmpty: 'Корзина пуста',
    goShopping: 'Перейти к покупкам',
    total: 'Итого',
    checkout: 'Оформить заказ',
    name: 'Имя',
    phone: 'Телефон',
    address: 'Адрес доставки',
    comment: 'Комментарий',
    yourOrder: 'Ваш заказ',
    confirmOrder: 'Подтвердить заказ',
    profile: 'Профиль',
    myOrders: 'Мои заказы',
    favorites: 'Избранное',
    settings: 'Настройки',
    support: 'Поддержка',
    home: 'Главная',
    catalog: 'Каталог',
    back: 'Назад',
    selectSizeColor: 'Выберите размер и цвет'
  },
  kk: {
    categories: 'Санаттар',
    men: 'Ерлерге',
    women: 'Әйелдерге',
    kids: 'Балаларға',
    shoes: 'Аяқ киім',
    accessories: 'Аксессуарлар',
    sale: 'Жеңілдік',
    size: 'Өлшемі',
    color: 'Түсі',
    description: 'Сипаттама',
    addToCart: 'Себетке қосу',
    cart: 'Себет',
    cartEmpty: 'Себет бос',
    goShopping: 'Сатып алуға өту',
    total: 'Барлығы',
    checkout: 'Тапсырыс беру',
    name: 'Аты',
    phone: 'Телефон',
    address: 'Жеткізу мекенжайы',
    comment: 'Түсініктеме',
    yourOrder: 'Сіздің тапсырысыңыз',
    confirmOrder: 'Тапсырысты растау',
    profile: 'Профиль',
    myOrders: 'Менің тапсырыстарым',
    favorites: 'Таңдаулылар',
    settings: 'Баптаулар',
    support: 'Қолдау',
    home: 'Басты',
    catalog: 'Каталог',
    back: 'Артқа',
    selectSizeColor: 'Өлшемі мен түсін таңдаңыз'
  }
};
