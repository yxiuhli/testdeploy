const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useAuth } from "@/contexts/AuthContext";

export const useEmployees = () => {
    const { authFetch } = useAuth();
    const approveEmployee = async (employeeId, position, salary) => {
        try {
            const response = await authFetch(`${API_BASE_URL}/employees/approve/${employeeId}`, {
                method: "POST",
                body: JSON.stringify({ position, salary}),
            });
            return await response.json();
        }
        catch (error) {
            console.error("Error accepting employee:", error);
        }
    }

    const rejectEmployee = async (employeeId) => {
        try {
            const response = await authFetch(`${API_BASE_URL}/employees/reject/${employeeId}`, {
                method: "DELETE",
            });
            return await response.json();
        } catch (error) {
            console.error("Error rejecting employee:", error);
        }
    }

    const updateSalary = async (employeeId, salary) => {
        try {
            const response = await authFetch(`${API_BASE_URL}/employees/salary/${employeeId}`, {
                method: "PUT",
                body: JSON.stringify({ salary }),
            });
            return await response.json();
        } catch (error) {
            console.error("Error updating salary:", error);
        }
    };

    const getSignedEmployees = async () => {
        try {
            console.log("Fetching accepted employees...");
            const response = await authFetch(`${API_BASE_URL}/employees/signed`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching accepted employees:", error);
        }
    };

    const getUnsignedEmployees = async () => {
        try {
            const response = await authFetch(`${API_BASE_URL}/employees/unsigned`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching waiting employees:", error);
        }
    };

    return {
        getSignedEmployees,
        getUnsignedEmployees,
        approveEmployee,
        updateSalary,
        rejectEmployee,
    };
}