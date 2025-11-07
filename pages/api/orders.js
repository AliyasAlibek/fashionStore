// API для заказов - КАК У ПЕКАРНИ!

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customer, items, total } = req.body;

    // Отправка в Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const orderText = `
🆕 Новый заказ!

👤 Клиент: ${customer.name}
📱 Телефон: ${customer.phone}
📍 Адрес: ${customer.address}
${customer.comment ? `💬 Комментарий: ${customer.comment}` : ''}

📦 Товары:
${items.map((item, i) => 
  `${i + 1}. ${item.name}
   Размер: ${item.selectedSize} | Цвет: ${item.selectedColor.name}
   ${item.price.toLocaleString()} ₸`
).join('\n\n')}

💰 Итого: ${total.toLocaleString()} ₸
      `.trim();

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: orderText
        })
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Заказ принят' 
    });

  } catch (error) {
    console.error('Order error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
