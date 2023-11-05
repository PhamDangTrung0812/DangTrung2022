const formCheckoutDOM = document.getElementById("form-checkout");

const carts = getCart();

const ORDER_KEY = "ORDER_KEY";

function getOrder() {
	const json = window.localStorage.getItem(ORDER_KEY);
	return JSON.parse(json || "[]");
}

function storeOneOrder(order) {
	const orders = getOrder();
	orders.push(order);
	window.localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

function main() {
	if (!formCheckoutDOM || !carts) return;
	if (carts.length == 0) {
		alter("Chhưa chọn sản phẩm");
		return;
	}
	formCheckoutDOM.addEventListener("submit", (e) => {
		e.preventDefault();
		const inputs = e.target.querySelectorAll("input");
		const order = {
			items: carts,
			total: calTotalPrice(carts),
		};
		inputs.forEach((input) => {
			order[input.name] = input.value;
		});
		alert("Thanh toán thành công");
		storeOneOrder(order);
		removeAllCart();
		location.href = "/index.html";
	});
}

main();
