const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { menu, hotIce, count, options, customerName, customerAffiliation, pickupTime } = req.body;

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          menu,
          hotIce,
          count,
          options,
          customerName,
          customerAffiliation,
          pickupTime
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: '주문 저장에 실패했습니다.' });
    }

    console.log('Inserted order data:', data);
    return res.status(200).json({ message: '주문이 성공적으로 저장되었습니다.' });
  } else {
    res.status(405).json({ message: '허용되지 않은 HTTP 메서드입니다.' });
  }
};
