// ES 모듈에서 import 사용
import { createClient } from '@supabase/supabase-js';

// Supabase URL과 키를 환경 변수로 설정
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*');

      if (error) {
        res.status(500).json({ error: '주문 데이터 조회 실패' });
      } else {
        res.status(200).json({ orders: data });
      }
    } catch (error) {
      res.status(500).json({ error: '주문 데이터 조회 중 오류 발생' });
    }
  } else {
    res.status(405).json({ error: '허용되지 않은 HTTP 메서드' });
  }
}
