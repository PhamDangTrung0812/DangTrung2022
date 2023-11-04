const headerSearchInputDOM = document.querySelector(".header__sreach-input");
const headerSearchHistoryDOM = document.querySelectorAll(
	".header__sreach-histrory-item",
);
const headerSearchHistoryItemsDOM = document.querySelector(
	".header__sreach-histrory",
);
const productsDOM = document.querySelectorAll(".home-product-item-img");

function searchfunc() {
	const valueSearch = headerSearchInputDOM.value;
	// AN VA HIEN
	headerSearchHistoryDOM.forEach((e) => {
		let text = e.innerText;
		if (!text || text.includes(valueSearch)) e.style.display = "";
		else e.style.display = "none";
	});
	updateValueSearchInput(valueSearch);
}

function updateValueSearchInput(value) {
	headerSearchInputDOM.value = value.trim();
	productsDOM.forEach((element) => {
		const { textContent } = element.querySelector(
			".home-product-item__name",
		);
		if (textContent.includes(value.trim())) {
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	});
}

function main() {
	headerSearchInputDOM.addEventListener("focus", (e) => {
		headerSearchHistoryItemsDOM.style.display = "block";
	});
	headerSearchInputDOM.addEventListener("focusout", (e) => {
		setTimeout(() => {
			headerSearchHistoryItemsDOM.style.display = "none";
		}, 500);
	});
	headerSearchHistoryDOM.forEach((element) => {
		element.addEventListener("click", (e) => {
			updateValueSearchInput(e.target.textContent);
		});
	});
}

main();
