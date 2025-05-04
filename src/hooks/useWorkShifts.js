import { useAuth } from "@/contexts/AuthContext";

export const useWorkShifts = () => {
    const { authFetch } = useAuth();
    
    const createWorkShift = async (workShift) => {
        try {
            const response = await authFetch("http://localhost:8080/api/work-shifts", {
                method: "POST",
                body: JSON.stringify(workShift),
            });
            return await response.json();
        } catch (error) {
            console.error("Error creating work shift:", error);
        }
    };

    const deleteWorkShift = async (shiftId) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/work-shifts/${shiftId}`, {
                method: "DELETE",
            });
            return await response.json();
        } catch (error) {
            console.error("Error deleting work shift:", error);
        }
    }

    const getWorkShifts = async () => {
        try {
            const response = await authFetch("http://localhost:8080/api/work-shifts");
            return await response.json();
        } catch (error) {
            console.error("Error fetching work shifts:", error);
        }
    };

    const getShiftsOfEmployee = async (employeeId) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/work-shifts/employee`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching work shift by employee ID:", error);
        }
    };
    const getEmployeesByShiftId = async (shiftId) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/employees/work-shift/${shiftId}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching employees by shift ID:", error);
        }
    }

    return {
        createWorkShift,
        deleteWorkShift,
        getWorkShifts,
        getShiftsOfEmployee,
        getEmployeesByShiftId,
    };
}