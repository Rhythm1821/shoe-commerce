'use client'
import { Button } from "@/components/ui/button";
import { addToInventory, fetchInventory } from "@/utils/api-client"
import { useEffect, useState } from "react"

export default function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [inventoryData, setInventoryData] = useState({});
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({...inventoryData,[name]: value});
    };

    useEffect(()=>{
        fetchInventory()
            .then((res)=>{setInventory(res.inventory)})
            .catch((err)=>console.log(err))
    },[])

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
        console.log("category", category);
        formData.append("category", category)
        formData.append("stockQuantity", inventoryData.stockQuantity);
        formData.append("shoeImages", images[0] ); // TODO: Add shoe images
        const res = await addToInventory(formData)
        const { message } = await res.json();
        if (res.status === 201) {
            console.log(message);
            return message
        } else {
            console.error(message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h2>Inventory</h2>
            {JSON.stringify(inventory)}

            <form onSubmit={handleSubmit} method="post" className="p-6 rounded shadow-md w-1/3 mx-auto">
                <input type="text" onChange={handleChange} name="name" placeholder="Name" />
                <input type="text" onChange={handleChange} name="description" placeholder="Description" />
                <input type="text" onChange={handleChange} name="price" placeholder="Price" />
                <input type="text" onChange={handleChange} name="brand" placeholder="Brand" />
                <input type="text" onChange={handleChange} name="material" placeholder="Material" />
                <input type="text" onChange={handleChange} name="color" placeholder="Color" />
                <input type="text" onChange={handleChange} name="sizes" placeholder="Sizes" />
                <select onChange={(e)=>setCategory(e.target.value)} name="category">
                    <option value="Formal">Formal</option>
                    <option value="Casual">Casual</option>
                    <option value="Sports">Sports</option>
                    <option value="Ethnic">Ethnic</option>
                    <option value="Boots">Boots</option>
                </select>
                <input type="text"  onChange={handleChange} name="stockQuantity" placeholder="Stock Quantity" />
                <input type="file" multiple onChange={(e)=>setImages(e.target.files)}  name="image" placeholder="Image" />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}