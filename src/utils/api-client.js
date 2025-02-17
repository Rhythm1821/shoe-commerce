import { toast } from "react-hot-toast"


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

export async function refreshToken(){
    const res = await fetch(`${API_BASE_URL}/api/refresh-token`, {
        method: "GET",
    });
    return res
}

export async function fetchProducts() {
    // refresh tokens
    // await getValidToken()
    try {
        const res = await fetch(`${API_BASE_URL}/api/market`);
        const data = await res.json();
        return data.products
    } catch (error) {
        toast.error("Failed to fetch products", error);
    }
}

export async function fetchProductDetails(id) {
    // await getValidToken()
    const res = await fetch(`${API_BASE_URL}/api/product-details/${id}`,{
        method: "GET",
    });

    return res
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
        toast.error("Error while posting register details", error);
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
        return res
    } catch (error) {
        toast.error("Failed to fetch cart", error);
    }
}

export async function addToCart(productId, quantity=1) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({productId, quantity}),
        })
        return res
    } catch (error) {
        toast.error("Failed to add product to cart", error);
    }
}

export async function removeFromCart(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/cart`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({id}),
        })

        return res
    } catch (error) {
        console.log("Error while deleting product from cart", error);
    }
}

export async function updateCart(id, quantity) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/cart`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({id, quantity}),
        })

        return res
    } catch (error) {
        console.log("Error while updating cart", error);
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
        toast.error("Failed to logout", error);
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
    return res
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
        toast.error("Error while adding product to inventory", error);
    }
}

export async function isAuthenticatedAndType() {
    const res = await fetch(`${API_BASE_URL}/api/cookies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return res
}

export async function deleteProductFromInventory(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
    
        return res
    } catch (error) {
        console.log("Error while deleting product from inventory", error);
    }
}

export async function updateInventory(id, data) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
            method: "PUT",
            credentials: "include",
            body: data
        })

        return res
    } catch (error) {
        console.log("Error while editing product from inventory", error);
    }
}