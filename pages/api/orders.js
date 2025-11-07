import { getSupabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customer, items, total } = req.body;
    const supabase = getSupabase();

    let orderId = null;

    // Сохраняем в Supabase (если настроен)
    if (supabase) {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: customer.name,
          customer_phone: customer.phone,
          customer_address: customer.address,
          customer_comment: customer.comment || '',
          items: items,
          total: total,
          status: 'new',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
      } else {
        orderId = data.id;
        console.log('✅ Заказ сохранён в Supabase:', orderId);
      }
    }

    // Отправляем в Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const orderText = `
🆕 Новый заказ${orderId ? ` #${orderId}` : ''}!

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

${orderId ? `🔗 ID в базе: ${orderId}` : '⚠️ БД не подключена'}
      `.trim();

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: orderText
          })
        }
      );

      if (telegramResponse.ok) {
        console.log('✅ Отправлено в Telegram');
      }
    }

    return res.status(200).json({ 
      success: true,
      message: 'Заказ принят',
      orderId: orderId,
      savedToDatabase: !!orderId
    });

  } catch (error) {
    console.error('Order error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
