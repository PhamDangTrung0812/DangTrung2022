const btnAddCartDOMs = document.querySelectorAll(".cart");
const sizeCartDOM = document.getElementById("size-cart");
const headerSizeCartDOM = document.getElementById("cart-size-header");
const cartContainerDOM = document.getElementById("cart-container");
const totalPriceDOM = document.getElementById("total-price");
const itemList = document.getElementById("cart-list-item");

const CART_KEY = "CART_KEY";

const $formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "VND",
});
function getCart() {
	const json = window.localStorage.getItem(CART_KEY);
	return JSON.parse(json || "[]");
}

function removeAllCart() {
	window.localStorage.removeItem(CART_KEY);
}

function storeCart(carts) {
	window.localStorage.setItem(CART_KEY, JSON.stringify(carts));
}

function renderCart(carts) {
	if (!cartContainerDOM || !sizeCartDOM) return;
	sizeCartDOM.textContent = `(${carts.length})`;
	const templates = carts
		.map(
			(cart, index) => `
		<div class="card-body p-4">
			<div class="row align-items-center">
				<div class="col-md-2">
					<img
						src="${cart.img}"
						class="img-fluid"
						alt="Generic placeholder image"
					/>
				</div>
				<div
					class="col-md-2 d-flex justify-content-center"
				>
					<div>
						<p class="lead fw-normal mb-0">
							${cart.name}
						</p>
					</div>
				</div>
				
				<div
					class="col-md-2 d-flex justify-content-center"
				>
					<div>
						<p class="lead fw-normal mb-0">${cart.quantity}</p>
					</div>
				</div>
				<div
					class="col-md-2 d-flex justify-content-center"
				>
					<div>
						<p class="lead fw-normal mb-0">
							${$formatter.format(cart.price)}
						</p>
					</div>
				</div>
				<div
					class="col-md-2 d-flex justify-content-center"
				>
					<div>
						
						<p class="lead fw-normal mb-0">
							${$formatter.format(cart.quantity * cart.price)}
						</p>
					</div>
				</div>
				<div
					class="col-md-2 d-flex justify-content-center"
				>
					<button class="btn btn-danger" onclick="deleteCart('${index}')">Xóa</button>
				</div>
			</div>
		</div>
		`,
		)
		.join("");

	cartContainerDOM.innerHTML = templates;
	const totalPrice = calTotalPrice(carts);
	totalPriceDOM.textContent =
		$formatter.format(totalPrice).substring(1) + "đ";
}

function calTotalPrice(carts) {
	return carts.reduce((total, cur) => {
		return total + cur.quantity * cur.price;
	}, 0);
}

function renderCartItemsList(carts) {
	if (headerSizeCartDOM) headerSizeCartDOM.textContent = carts.length;
	if (itemList) {
		const templates = carts
			.map(
				(cart, index) => `
			<li class="header__cart-item">
				<img src="${cart.img}" alt="" class="header__cart-img">
				<div class="header__cart-item-info">
					<div class="header__cart-item-head">
						<h5 class="header__cart-item-name">${cart.name.trim()} </h5>
						<div class="header__cart-item-price-wrap">
							<span class="header__cart-item-price">Giá: ${$formatter.format(
								cart.price,
							)} </span>
							<span class="header__cart-item-multiply">x</span>
							<span class="header__cart-item-qnt">${cart.quantity}</span>
						</div>
					</div>
					<div class="header__cart-item-body">
						<span class="header__cart-item-remove" onclick="deleteCart('${index}')">xóa</span>
					</div>
				</div>
			</li>
		`,
			)
			.join("");
		itemList.innerHTML = templates;
	}
}

function deleteCart(index) {
	const ok = confirm("xóa giỏ hàng");
	if (!ok) return;
	const carts = getCart();
	carts.splice(index, 1);
	storeCart(carts);
	renderCart(carts);
	renderCartItemsList(carts);
	toastr.success("Xóa sản phẩm thành công");
}

function main() {
	const carts = getCart();
	renderCart(carts);
	renderCartItemsList(carts);
	btnAddCartDOMs.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			const cart = {
				...e.target.dataset,
				name: e.target.dataset.name.trim(),
				quantity: 1,
			};

			// check exist product in carts
			const c = carts.find((i) => i.name === cart.name);
			if (c) {
				c.quantity = c.quantity + 1;
			} else {
				carts.push(cart);
			}
			storeCart(carts);
			toastr.success("Thêm giỏ hàng thành công");
			renderCartItemsList(carts);
		});
	});
}

main();
