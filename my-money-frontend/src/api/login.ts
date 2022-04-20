import { api } from "./api";


export const loginAPI = {
  createToken: async (data: { username: string; password: string }) =>
    await api.post("api-token-auth/", data),

  validateToken: async (token: string) =>
    await api.get("people/get_auth/", {
      headers: { Authorization: `Token ${token}` },
    }),

  createAccount: async (
    accountData: {
      username: string,
      email: string,
      first_name: string,
      last_name: string,
      password: string,
      password2: string,
    },
  ) =>
    await api.post("register/", accountData),
};
