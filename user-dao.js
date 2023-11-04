function UserDao() {
	const USER_CONTAINER_KEY = "USER_CONTAINER_KEY";
	const USER_SESSION_KEY = "USER_SESSION_KEY";

	const userList = JSON.parse(
		localStorage.getItem(USER_CONTAINER_KEY) ?? "[]",
	);

	const checkExistUsername = (username) => {
		const u = userList.find((x) => x.username === username);
		if (u) throw new Error("username đã tồn tại");
	};

	const save = (user) => {
		checkExistUsername(user.username);
		userList.push(user);
		localStorage.setItem(USER_CONTAINER_KEY, JSON.stringify(userList));
	};

	const login = (username, password) => {
		const u = userList.find((x) => x.username === username);
		if (!u) throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác");
		if (atob(u.password) !== password)
			throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác");
		sessionStorage.setItem(USER_SESSION_KEY, btoa(JSON.stringify(u)));
	};

	const logout = () => {
		sessionStorage.removeItem(USER_SESSION_KEY);
	};

	return {
		checkExistUsername,
		save,
		login,
		logout,
	};
}

const $userDao = new UserDao();
