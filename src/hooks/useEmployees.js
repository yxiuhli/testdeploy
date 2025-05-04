import { useAuth } from "@/contexts/AuthContext";

export const useEmployees = () => {
    const { authFetch } = useAuth();
    const approveEmployee = async (employeeId, position, salary) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/employees/approve/${employeeId}`, {
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
            const response = await authFetch(`http://localhost:8080/api/employees/reject/${employeeId}`, {
                method: "DELETE",
            });
            return await response.json();
        } catch (error) {
            console.error("Error rejecting employee:", error);
        }
    }

    const updateSalary = async (employeeId, salary) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/employees/salary/${employeeId}`, {
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
            const response = await authFetch("http://localhost:8080/api/employees/signed");
            return await response.json();
        } catch (error) {
            console.error("Error fetching accepted employees:", error);
        }
    };

    const getUnsignedEmployees = async () => {
        try {
            const response = await authFetch("http://localhost:8080/api/employees/unsigned");
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