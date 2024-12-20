const API_URL = 'http://localhost:3000/orders'; // 서버 주소

// 주문 데이터를 불러와 화면에 표시하는 함수
async function loadOrders() {
    try {
        const response = await fetch(API_URL); // 서버에서 데이터 가져오기
        const orders = await response.json();

        // 데이터를 화면에 표시
        const orderRows = document.getElementById('order-rows');
        orderRows.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.menu}</td>
                <td>${order.quantity}</td>
                <td>${order.options}</td>
                <td>${order.pickup_time}</td>
            `;
            orderRows.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// 새로운 주문을 서버에 보내는 함수
async function addOrder(order) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            alert('Order added successfully!');
            loadOrders(); // 주문 목록 다시 불러오기
        }
    } catch (error) {
        console.error('Error adding order:', error);
    }
}

// 페이지 로드 시 주문 데이터 불러오기
window.onload = loadOrders;
