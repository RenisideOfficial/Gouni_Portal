import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "", // "" works for relative calls
  withCredentials: true, // for HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
});
