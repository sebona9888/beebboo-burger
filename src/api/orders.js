import api from "./api";

export const getOrders = () => api.get("/orders");
export const createOrder = (order) => api.post("/orders", order);
export const updateOrder = (id, order) => api.put(`/orders/${id}`, order);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);