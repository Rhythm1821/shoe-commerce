
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

export async function apiClient(endpoint, options = {}) {
    const baseUrl = process.env.API_BASE_URL
    const url = `${baseUrl}/${endpoint}`

    const response = await fetch(url, options)

    if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`)
    }

    return response.json()
}


export async function fetchProducts() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/market`);
        const data = await res.json();
        return data.products
    } catch (error) {
        console.log("Failed to fetch products", error);
    }
}

export async function postRegisterDetails(data, type) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/${type}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        return res
    } catch (error) {
        console.log("Error while posting register details", error);
    }
}

export async function postLoginDetails(data, type) {
    const response = await fetch(`${API_BASE_URL}/api/users/${type}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

    return response
}

// secured fetching
export async function fetchCart() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Failed to fetch cart", error);
    }
}


export async function fetchLogout() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/logout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        );
        const data = await res.json();
        return data
    } catch (error) {
        console.log("Failed to logout", error);
    }
}


// Seller
export async function fetchInventory(){
    const res = await fetch(`${API_BASE_URL}/api/inventory`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })

    const data = await res.json();
    return data
}

export async function addToInventory(data) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/inventory`, {
            method: "POST",
            credentials: "include",
            body: data
        })
    
        return res
    } catch (error) {
        console.log("Error while adding product to inventory", error);
    }
}