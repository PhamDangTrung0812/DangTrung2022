const headerNavbarListDOM = document.querySelectorAll(
	".header__navbar-list",
)[1];
const registerNavDOM = headerNavbarListDOM.querySelector("#register-nav");
const loginNavDOM = headerNavbarListDOM.querySelector("#login-nav");

function logout() {
	$userDao.logout();
	window.location.pathname = "index.html";
}

function main() {
	try {
		const key = sessionStorage.getItem("USER_SESSION_KEY");
		if (!key) return;
		const auth = JSON.parse(atob(key));
		if (!auth) return;
		registerNavDOM.style.display = "none";
		loginNavDOM.style.display = "none";
		const li = document.createElement("li");
		li.classList.add("header__navbar-item", "header__navbar-user");
		li.innerHTML = `
            <img src="https://yt3.ggpht.com/ytc/AOPolaSk5uEb-KxrW_e6BDv0-rAjGtZneZLya_zRSKkkXTh6JA=s88-c-k-c0x00ffffff-no-rj" alt="" class="header__navbar-user-img">
            <span class="header__navbar-user-name">${auth.username}</span>
            <ul class="head__navbar-user-meun">
                <li class="head__navbar-user-item">
                    <a href="taikhoan/tkng.html">Tài khoản của tôi</a>
                </li>

                <li class="head__navbar-user-item">
                    <a href="">Địa chỉ của tôi</a>
                </li>

                <li class="head__navbar-user-item">
                    <a href="">Đơn mua</a>
                </li>

                <li class="head__navbar-user-item head__navbar-user-item--separate">
                    <a href="#" onclick="logout()">Đăng xuất</a>
                </li>
            </ul>
        `;
		headerNavbarListDOM.appendChild(li);
	} catch (e) {}
}
main();
