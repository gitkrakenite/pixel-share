import axios from "../../axios";

// register user
const register = async (userData) => {
  const response = await axios.post("/user/register", userData);

  if (response.data) {
    // This will make our data persist even when we refresh
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

// login user
const login = async (userData) => {
  const response = await axios.post("/user/login", userData);

  if (response.data) {
    // This will make our data persist even when we refresh
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// delete my report
const updateUser = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put("/user/update" + user, config);
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  updateUser,
};

export default authService;
