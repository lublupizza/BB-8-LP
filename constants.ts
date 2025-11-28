import { BotScenario, DailyUserStat, OrderRejectionReason } from './types';

// --- DATA & TEXTS ---

export const SCENARIOS: BotScenario[] = [
  {
    id: 'start',
    title: '1. Старт бота',
    description: 'Приветствие и главное меню.',
    botMessage: `Привет! 👋 Это ЛюблюPizza ❤️\n\nМы готовим самую вкусную пиццу в Курске! \nЗдесь ты можешь:\n🍕 Посмотреть меню и сделать заказ\n🔥 Узнать про горячие акции\n🚚 Уточнить зоны доставки\n\nС чего начнем?`,
    keyboard: {
      one_time: false,
      inline: false,
      buttons: [
        [
          { action: { type: 'text', label: '🍕 Меню', payload: '{"cmd":"menu"}' }, color: 'primary' },
          { action: { type: 'text', label: '🔥 Акции и скидки', payload: '{"cmd":"promo"}' }, color: 'positive' }
        ],
        [
          { action: { type: 'text', label: '⏳ Время доставки', payload: '{"cmd":"time"}' }, color: 'secondary' },
          { action: { type: 'text', label: '📞 Связаться с оператором', payload: '{"cmd":"call_manager"}' }, color: 'secondary' }
        ]
      ]
    }
  },
  {
    id: 'how_to_order',
    title: '2. Как оформить заказ (Инфо)',
    description: 'Информация о способах заказа.',
    botMessage: `Оформить заказ в ЛюблюPizza ❤️ проще простого!\n\n📱 Через наше мини-приложение (самый быстрый способ)\n🌐 На сайте: люблюпицца.рф\n📞 По телефону: 600-500\n\nКстати, можно оформить предзаказ на удобное время! 😉`,
    keyboard: {
      one_time: false,
      inline: false,
      buttons: [
        [
          { action: { type: 'open_link', label: '🌐 Заказать на сайте', link: 'https://люблюпицца.рф' }, color: 'primary' }
        ],
        [
          { action: { type: 'text', label: '👤 Позвать оператора', payload: '{"cmd":"call_manager"}' }, color: 'secondary' },
          { action: { type: 'text', label: '🔙 В главное меню', payload: '{"cmd":"start"}' }, color: 'secondary' }
        ]
      ]
    }
  },
  {
    id: 'menu_online',
    title: '3. Меню',
    description: 'Выбор способа заказа.',
    botMessage: `Отличный выбор! 🍕\n\nКак вам удобнее сделать заказ?\nВыбирайте вариант ниже 👇`,
    keyboard: {
      one_time: false,
      inline: false,
      buttons: [
        [
          { action: { type: 'open_link', label: '🌐 Заказать на сайте', link: 'https://люблюпицца.рф' }, color: 'primary' }
        ],
        [
          { action: { type: 'text', label: '📞 Позвонить по тел', payload: '{"cmd":"call_phone"}' }, color: 'secondary' },
          { action: { type: 'text', label: '👤 Вызов оператора', payload: '{"cmd":"call_operator_order"}' }, color: 'secondary' }
        ]
      ]
    }
  },
  {
    id: 'delivery_time',
    title: '4. Время доставки',
    description: 'Информация о таймингах.',
    botMessage: `🕒 Наши стандарты скорости:\n\n🚗 Доставка по городу: ~45–60 минут\n🏃 Самовывоз: ~15–20 минут\n\nВремя считается с момента подтверждения заказа и начала приготовления. В часы пик время может быть немного увеличено, мы предупредим! ❤️`,
    keyboard: {
      one_time: false,
      inline: false,
      buttons: [
        [
          { action: { type: 'text', label: '👤 Позвать оператора', payload: '{"cmd":"call_manager"}' }, color: 'primary' },
          { action: { type: 'text', label: '🔙 Назад', payload: '{"cmd":"start"}' }, color: 'secondary' }
        ]
      ]
    }
  },
  {
    id: 'check_zone',
    title: '5. Зона доставки',
    description: 'Проверка адреса.',
    botMessage: `Мы доставляем почти по всему Курску! 🌍\n\nПосмотреть карту зон доставки можно здесь: [ссылка на карту].\n\nИли просто напиши свой адрес (Улица, дом) в ответном сообщении, и я подскажу! 👇`,
    keyboard: {
      one_time: false,
      inline: false,
      buttons: [
        [
          { action: { type: 'open_link', label: '🗺 Открыть карту', link: 'https://yandex.ru/maps/...' }, color: 'primary' }
        ],
        [
          { action: { type: 'text', label: 'Не получается найти', payload: '{"cmd":"help_address"}' }, color: 'secondary' },
          { action: { type: 'text', label: '👤 Позвать оператора', payload: '{"cmd":"call_manager"}' }, color: 'secondary' }
        ]
      ]
    }
  },
  {
    id: 'complaint',
    title: '6. Жалоба / Проблема',
    description: 'Сбор обратной связи.',
    botMessage: `Ой, нам очень жаль, что что-то пошло не так! 😔\nМы обязательно разберемся.\n\nПожалуйста, напиши одним сообщением:\n1. Твой телефон\n2. Дату и время заказа\n3. Что случилось (кратко)\n\nЕсли есть фото — прикрепи его. Я сразу передам это в отдел качества ЛюблюPizza! ❤️`,
    keyboard: {
      one_time: false,
      inline: false,
      buttons: [
        [
          { action: { type: 'text', label: '👤 Позвать оператора', payload: '{"cmd":"call_manager"}' }, color: 'primary' }
        ],
        [
          { action: { type: 'text', label: '🔙 Отмена', payload: '{"cmd":"start"}' }, color: 'secondary' }
        ]
      ]
    }
  },
  {
    id: 'newsletter',
    title: '7. Пример рассылки',
    description: 'Сообщение при выходе нового поста.',
    botMessage: `У нас новая акция! 🔥\n\nДарим Пепперони 25см при заказе от 990₽! Промокод: LOVE24.\nПодробности в новом посте 👇`,
    keyboard: {
      one_time: false,
      inline: false,
      buttons: [
        [
          { action: { type: 'open_link', label: 'Посмотреть пост', link: 'https://vk.com/wall-xxxxx_xxxx' }, color: 'primary' }
        ],
        [
          { action: { type: 'open_link', label: '📱 Открыть меню', link: 'https://vk.com/app12345' }, color: 'secondary' },
          { action: { type: 'text', label: '🔕 Отписаться', payload: '{"cmd":"unsubscribe"}' }, color: 'secondary' }
        ]
      ]
    }
  },
  {
    id: 'reminder',
    title: '8. Напоминание ("Брошенная корзина")',
    description: 'Если смотрел меню, но не купил.',
    botMessage: `Привет! Видели, что ты заглядывал в меню, но так и не сделал заказ... 🤔\n\nМожет, что-то остановило? Поделись, это поможет нам стать лучше! ❤️`,
    keyboard: {
      one_time: true,
      inline: false,
      buttons: [
        [
          { action: { type: 'text', label: '💸 Дорого', payload: '{"cmd":"reason_price"}' }, color: 'secondary' },
          { action: { type: 'text', label: '🤯 Не разобрался', payload: '{"cmd":"reason_ux"}' }, color: 'secondary' }
        ],
        [
          { action: { type: 'text', label: '👀 Просто смотрел', payload: '{"cmd":"reason_browsing"}' }, color: 'secondary' },
          { action: { type: 'text', label: '🤔 Передумал', payload: '{"cmd":"reason_mind"}' }, color: 'secondary' }
        ],
        [
          { action: { type: 'text', label: '✏️ Другое', payload: '{"cmd":"reason_other"}' }, color: 'secondary' }
        ]
      ]
    }
  }
];

// --- MOCK ANALYTICS DATA ---

export const USER_STATS_DATA: DailyUserStat[] = [
  { date: '01.10', newUsers: 12, orders: 5 },
  { date: '02.10', newUsers: 15, orders: 8 },
  { date: '03.10', newUsers: 22, orders: 12 },
  { date: '04.10', newUsers: 18, orders: 9 },
  { date: '05.10', newUsers: 35, orders: 20 },
  { date: '06.10', newUsers: 40, orders: 25 },
  { date: '07.10', newUsers: 28, orders: 18 },
];

export const NO_ORDER_REASONS: OrderRejectionReason[] = [
  { reason: 'Просто смотрел', count: 45 },
  { reason: 'Дорого', count: 20 },
  { reason: 'Передумал', count: 15 },
  { reason: 'Не разобрался', count: 5 },
  { reason: 'Другое', count: 15 },
];