import { useAuth } from "@/contexts/AuthContext";

export const usePayments = () => {
  const { authFetch } = useAuth();

  const getPayments = async () => {
    try {
      const response = await authFetch("http://localhost:8080/api/payments");
      return await response.json();
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return { getPayments }
}