async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const data = await response.json();
        
        const menuDiv = document.getElementById('menu');
        data.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerText = `${item.name} - $${item.price}`;
            menuDiv.appendChild(menuItem);
        });
        document.getElementById('order-button').style.display = 'block';
        
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ['Cheeseburger', 'Veggie Burger', 'Chicken Burger', 'Double Burger'];
            const selectedBurgers = [];
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                selectedBurgers.push(burgers[randomIndex]);
            }
            resolve({ orderItems: selectedBurgers });
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert("Thank you for eating with us today!");
}
async function handleOrder() {
    try {
        const order = await takeOrder();
        console.log('Order taken:', order);

        const prepStatus = await orderPrep();
        console.log('Order preparation status:', prepStatus);

        const paymentStatus = await payOrder();
        console.log('Payment status:', paymentStatus);

        if (paymentStatus.paid) {
            thankyouFnc();
        }
        
    } catch (error) {
        console.error('Error during the ordering process:', error);
    }
}
document.getElementById('order-button').addEventListener('click', handleOrder);
window.onload = getMenu;