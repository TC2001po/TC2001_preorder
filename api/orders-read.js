import { createClient } from '@supabase/supabase-js';

// Supabase URL과 키를 환경 변수로 설정
const supabaseUrl = process.https://emrjszlukuetqjncslqs.supabase.co;
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcmpzemx1a3VldHFqbmNzbHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MjUwNzQsImV4cCI6MjA1MDMwMTA3NH0.U-K6nR6pIZeOAlZjlLhOt_iE8WOAx9Nbi2SkpSyMRvM;
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
