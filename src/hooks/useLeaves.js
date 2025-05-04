// hooks/useLeaves.js
import { useAuth } from "@/contexts/AuthContext";

export const useLeaves = () => {
  const { authFetch } = useAuth();
  
  const submitRequest = async (requestData) => {
    try {
      const response = await authFetch('http://localhost:8080/api/leave-requests', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error("Error submitting leave request:", error);
      throw error;
    }
  };

  const getEmployeeRequests = async () => {
    try {
      const response = await authFetch(`http://localhost:8080/api/leave-requests/employee`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching employee leave requests:", error);
      throw error;
    }
  }

  const updateRequest = async (requestId, status, adminComment) => {
    try {
      const response = await authFetch(`http://localhost:8080/api/leave-requests/${requestId}`, {
        method: 'PUT',
        body: JSON.stringify({ status, adminComment }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating leave request status:", error);
      throw error;
    }
  };

  const getPendingRequests = async () => {
    try {
      const response = await authFetch('http://localhost:8080/api/leave-requests/pending');
      return await response.json();
    } catch (error) {
      console.error("Error fetching pending leave requests:", error);
      throw error;
    }
  };

  const getReviewedRequests = async () => {
    try {
      const response = await authFetch('http://localhost:8080/api/leave-requests/reviewed');
      return await response.json();
    } catch (error) {
      console.error("Error fetching reviewed leave requests:", error);
      throw error;
    }
  };

  return {
    getEmployeeRequests,
    submitRequest,
    updateRequest,
    getPendingRequests,
    getReviewedRequests
  };
};