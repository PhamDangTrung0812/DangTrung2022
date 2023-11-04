const loginFormDOM = document.getElementById("login-form");
const usernameInputDOM = loginFormDOM.querySelector("#username");
const passwordInputDOM = loginFormDOM.querySelector("#password");
loginFormDOM.addEventListener("submit", (event) => {
	event.preventDefault();
	try {
		$userDao.login(usernameInputDOM.value, passwordInputDOM.value);
		alert("Đăng nhập thành công");
		window.location.pathname = "index.html";
	} catch (e) {
		alert(e.message);
	}
});
