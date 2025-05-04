import { useAuth } from "@/contexts/AuthContext";

export const useDrinks = () => {
  const { authFetch } = useAuth();

  const getDrinks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/drinks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  const addDrink = async (drink) => {
    try {
      const response = await authFetch("http://localhost:8080/api/drinks", {
        method: "POST",
        body: JSON.stringify(drink),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding drink:", error);
    }
  };

  const updateDrink = async (drink) => {
    try {
      const response = await authFetch(`http://localhost:8080/api/drinks/${drink.id}`, {
        method: "PUT", 
        body: JSON.stringify(drink),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating drink:", error);
    }
  };

  const deleteDrink = async (slug) => {
    try {
      const response = await authFetch(`http://localhost:8080/api/drinks/${slug}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete drink');
      }
  
      // Handle 204 No Content or empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { success: true }; // Return a success object if no JSON response
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting drink:", error);
      throw error; // Re-throw to handle in the calling code
    }
  };

  const getDrinkBySlug = async (slug) => {
    try {
      const response = await fetch(`http://localhost:8080/api/drinks/${slug}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching drink by slug:", error);
    }
  };

  const getBestSellingDrinks = async () => {
    try {
      const response = await fetch("http://localhost:3000/drinks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching best selling drinks:", error);
    }
  };

  const getRecentAddedDrinks = async () => {
    try {
      const response = await fetch("http://localhost:3000/drinks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching recent added drinks:", error);
    }
  };

  return {
    getDrinks,
    addDrink,
    updateDrink,
    deleteDrink,
    getBestSellingDrinks,
    getRecentAddedDrinks,
    getDrinkBySlug,
  };
};
