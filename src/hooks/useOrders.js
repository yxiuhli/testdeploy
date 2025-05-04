const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useAuth } from "@/contexts/AuthContext";

export const useOrders = () => {
  const { authFetch } = useAuth();

  const getOrders = async () => {
    try {
      const response = await authFetch(`${API_BASE_URL}/orders`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  return { getOrders }
}