import { api } from "./api";


export const peopleAPI = {
  getUsername: async (token: string) =>
    await api.get("people/get_username/", {
      headers: { Authorization: `Token ${token}` },
    }),

  getFullName: async (token: string) =>
    await api.get("people/get_full_name/", {
      headers: { Authorization: `Token ${token}` },
    }),
};
