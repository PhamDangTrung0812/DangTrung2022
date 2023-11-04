const registerFormDOM = document.getElementById("register-form");
const usernameInputDOM = registerFormDOM.querySelector("#username");
const passwordInputDOM = registerFormDOM.querySelector("#password");
const repeatPasswordInputDOM =
	registerFormDOM.querySelector("#repeat-password");
registerFormDOM.addEventListener("submit", (event) => {
	const usernameValue = usernameInputDOM.value;
	const passwordValue = passwordInputDOM.value;
	const repeatPasswordValue = repeatPasswordInputDOM.value;
	if (passwordValue !== repeatPasswordValue) {
		alert("Mật khẩu không trùng nhau");
		return;
	}
	try {
		$userDao.save({
			username: usernameValue,
			password: window.btoa(passwordValue),
		});
		alert("Đăng ký thành công");
		window.location.pathname = "/taikhoan/dangkythanhcong.html";
	} catch (e) {
		alert(e.message);
		event.preventDefault();
	}
});
