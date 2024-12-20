require('dotenv').config();  // .env 파일에서 환경 변수 읽기


console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key:', process.env.SUPABASE_KEY);

// 기존 import
// import { createClient } from '@supabase/supabase-js';

// 변경된 require 문
const { createClient } = require('@supabase/supabase-js');


// Supabase URL과 키를 환경 변수로 설정
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orders, pickupTime } = req.body;
    try {
      // Supabase에 주문 데이터 삽입
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

