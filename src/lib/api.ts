// lib/api.ts
export const loginUser = async (username: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
  
    return response.json();
  };
  
  export const addRestaurant = async (restaurant: { name: string; description: string; location: string }) => {
    const response = await fetch('/api/addRestaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurant),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add restaurant');
    }
  
    return response.json();
  };
  
  export const getRestaurants = async () => {
    const response = await fetch('/api/getRestaurants');
  
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
  
    return response.json();
  };
  

  export const deleteRestaurant = async (id: number) => {
    const response = await fetch(`/api/deleteRestaurant?id=${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete restaurant');
    }
  
    return response.json();
  };

  export const updateRestaurant = async (id: number, restaurant: { name: string; description: string; location: string }) => {
    const response = await fetch(`/api/updateRestaurant/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurant),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update restaurant');
    }
  
    return response.json();
  };

  export const getRestaurantById = async (id: number) => {
    const response = await fetch(`/api/getRestaurant/${id}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant');
    }
  
    return response.json();
  };