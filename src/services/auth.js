import JWT from "jsonwebtoken";
import axios from "axios";

const auth = {
  getToken: async (username, password) => {
    const response = await axios.post("/api/login", {
      username,
      password,
    });

    return response.data.token;
  },
  verifyToken: async (token) => {
    return JWT.verify(token, process.env.JWT_SECRET);
  },
};

export default auth;