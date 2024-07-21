'use client'
import { Button } from "@/components/ui/button";
import { addToInventory, fetchInventory } from "@/utils/api-client"
import { useEffect, useRef, useState } from "react"

export default function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [inventoryData, setInventoryData] = useState({
        name: '',
        description: '',
        price: '',
        brand: '',
        material: '',
        color: '',
        sizes: '',
        stockQuantity: ''
    });
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", inventoryData.name);
        formData.append("description", inventoryData.description);
        formData.append("price", inventoryData.price);
        formData.append("brand", inventoryData.brand);
        formData.append("material", inventoryData.material);
        formData.append("color", inventoryData.color);
        formData.append("sizes", inventoryData.sizes);
        if (category === "") {
            return;
        }
        formData.append("category", category);
        formData.append("stockQuantity", inventoryData.stockQuantity);
        formData.append("shoeImages", images[0]);
        const res = await addToInventory(formData);
        const { message } = await res.json();
        if (res.status === 201) {
            console.log(message);
            try {
                const updatedInventory = await fetchInventory();
                const data = await updatedInventory.json();
                if (!updatedInventory.ok) {
                    setError(data.message);
                }
                setInventory(data.inventory);
                // Reset form fields
                setInventoryData({
                    name: '',
                    description: '',
                    price: '',
                    brand: '',
                    material: '',
                    color: '',
                    sizes: '',
                    stockQuantity: ''
                });
                setImages([]);
                setCategory('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (error) {
                setError(error.message);
            }
            return message;
        } else {
            console.error(message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    useEffect(() => {
        async function getInventory() {
            try {
                const res = await fetchInventory();
                const data = await res.json();
                console.log("res", res);
                if (!res.ok) {
                    setError(data.message);
                }
                setInventory(data.inventory);
            } catch (error) {
                setError(error.message);
            }
        }
        getInventory();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h2>Inventory</h2>
            {inventory && inventory.map((product) => (
                <div className="p-6 rounded shadow-md w-1/3 mx-auto text-gray-800 mr-2" key={product._id}>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.brand}</p>
                    <p>{product.material}</p>
                    <p>{product.color}</p>
                    <p>{product.sizes}</p>
                    <p>{product.category}</p>
                    <p>{product.stockQuantity}</p>
                </div>
            ))}

            <form onSubmit={handleSubmit} method="post" className="p-6 rounded shadow-md w-1/3 mx-auto text-gray-800">
                <input type="text" value={inventoryData.name} onChange={handleChange} name="name" placeholder="Name" />
                <input type="text" value={inventoryData.description} onChange={handleChange} name="description" placeholder="Description" />
                <input type="text" value={inventoryData.price} onChange={handleChange} name="price" placeholder="Price" />
                <input type="text" value={inventoryData.brand} onChange={handleChange} name="brand" placeholder="Brand" />
                <input type="text" value={inventoryData.material} onChange={handleChange} name="material" placeholder="Material" />
                <input type="text" value={inventoryData.color} onChange={handleChange} name="color" placeholder="Color" />
                <input type="text" value={inventoryData.sizes} onChange={handleChange} name="sizes" placeholder="Sizes" />
                <select value={category} onChange={(e) => setCategory(e.target.value)} name="category">
                    <option value="">Select Category</option>
                    <option value="Formal">Formal</option>
                    <option value="Casual">Casual</option>
                    <option value="Sports">Sports</option>
                    <option value="Ethnic">Ethnic</option>
                    <option value="Boots">Boots</option>
                </select>
                <input type="text" value={inventoryData.stockQuantity} onChange={handleChange} name="stockQuantity" placeholder="Stock Quantity" />
                <input type="file" multiple onChange={(e) => setImages(e.target.files)} ref={fileInputRef} name="image" placeholder="Image" />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}
