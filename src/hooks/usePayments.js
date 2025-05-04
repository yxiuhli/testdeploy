const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useAuth } from "@/contexts/AuthContext";

export const usePayments = () => {
  const { authFetch } = useAuth();

  const getPayments = async () => {
    try {
      const response = await authFetch(`${API_BASE_URL}/payments`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return { getPayments }
}