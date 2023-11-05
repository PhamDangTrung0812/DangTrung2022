const nameDOM = document.getElementById("name");
const imageDOM = document.getElementById("image");
const thongTinThemDOM = document.getElementById("thongTinThem");
const imageContainerDOM = document.getElementById("image-container");
const cuoicungDOM = document.getElementById("cuoicung");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "VND",
});

fetch("http://127.0.0.1:5500/data.json")
	.then((res) => res.json())
	.then((json) => {
		const data = json.find((x) => x.id == id);

		nameDOM.textContent = data.name;
		imageDOM.src = data.image;

		const html = data.thongTinThem
			.map((x) => `<li class='nhomdinhtt'>${x.label}: ${x.value}</li>`)
			.join(" ");
		thongTinThemDOM.innerHTML = html;

		const htmlImage = data.images
			.map(
				(x) =>
					`<img src="${x}" , alt="" width="100" class="nhieuanhctsp">`,
			)
			.join(" ");
		imageContainerDOM.innerHTML = htmlImage;

		const cuoiCung = data.giaTien
			.map(
				(x, index) => `
                <ul id="giaTienHai" class="cuoicung${index + 1}">
                    <li>${x.label} </li>
                    <li>${formatter.format(x.value).substring(1)}đ </li>
                </ul>
        `,
			)
			.join(" ");

		cuoicungDOM.innerHTML = cuoiCung;
	})
	.catch((error) => console.error(error));
