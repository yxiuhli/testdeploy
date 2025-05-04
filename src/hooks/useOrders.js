import { useAuth } from "@/contexts/AuthContext";

export const useOrders = () => {
  const { authFetch } = useAuth();

  const getOrders = async () => {
    try {
      const response = await authFetch("http://localhost:8080/api/orders");
      return await response.json();
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  return { getOrders }
}