'use client'
import { Button } from "@/components/ui/button";
import { addToInventory, deleteProductFromInventory, fetchInventory, updateInventory } from "@/utils/api-client";
import { useEffect, useRef, useState } from "react";

import ProductInventoryModal from "@/components/Modal/Inventory/Product";

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
    const [productId, setProductId] = useState(null);
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(null);
    const fileInputRef = useRef(null);
    const [modalOperation,setModalOperation] = useState(null);

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
        if (modalOperation === "add") {
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
                    setIsOpen(false); // Close the modal
                } catch (error) {
                    setError(error.message);
                }
                return message;
            } else {
                console.error(message);
            }
        } 
        else if (modalOperation === "edit") {
            const res = await updateInventory(productId, formData);
            const { message } = await res.json();
            if (res.status === 200) {
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
                    setIsOpen(false); // Close the modal
                } catch (error) {
                    setError(error.message);
                }
                return message;
            } else {
                console.error(message);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteProductFromInventory(id);
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
            }
            console.log("deleted", data);
            setInventory(inventory.filter((product) => product._id !== id));
            alert("Product deleted successfully");
            return data.message;
        } catch (error) {
            console.log("error deleting", error);
        }
    }

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

    const closeModal = () => setIsOpen(false);

    const openModal = (product = null) => {
        if (product) {
            setInventoryData({
                name: product.name,
                description: product.description,
                price: product.price,
                brand: product.brand,
                material: product.material,
                color: product.color,
                sizes: product.sizes,
                stockQuantity: product.stockQuantity
            });
            setCategory(product.category);
        } else {
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
            setCategory('');
        }
        setIsOpen(true);
    };

    if (error) {
        return <p>{error}</p>;
    }

    const truncateDescription = (description, limit) => {
        if (description.length > limit) {
            return description.substring(0, limit) + '...';
        }
        return description;
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Inventory</h2>
            <Button onClick={() => {
                setModalOperation("add");
                openModal();
            }} className="bg-blue-500 text-white p-2 rounded-full mt-4 hover:bg-blue-600">Add Product</Button>
            <div className="flex flex-col items-center">
                <div className="w-full max-w-5xl mb-4 overflow-x-auto">
                    <table className="min-w-full  bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Brand</th>
                                <th className="py-2 px-4 border-b">Material</th>
                                <th className="py-2 px-4 border-b">Color</th>
                                <th className="py-2 px-4 border-b">Sizes</th>
                                <th className="py-2 px-4 border-b">Category</th>
                                <th className="py-2 px-4 border-b">Stock Quantity</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory && inventory.map((product) => (
                                <tr key={product._id} onClick={(e)=> {
                                    if (e.target.id !== `show-more-btn-${product._id}`) {
                                        window.open(`/product/${product._id}`, '_blank')
                                    }
                                }} className="cursor-pointer hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{product.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        {showFullDescription === product._id 
                                            ? product.description 
                                            : truncateDescription(product.description, 30)}
                                        {product.description.length > 10 && (
                                            <button id={`show-more-btn-${product._id}`}
                                                className="text-blue-500 ml-2 text-sm hover:text-blue-700" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowFullDescription(showFullDescription === product._id ? null : product._id)
                                                }}
                                            >
                                                {showFullDescription === product._id ? <p>Show less</p> : <h6>...more</h6>}
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">{product.price}</td>
                                    <td className="py-2 px-4 border-b">{product.brand}</td>
                                    <td className="py-2 px-4 border-b">{product.material}</td>
                                    <td className="py-2 px-4 border-b">{product.color}</td>
                                    <td className="py-2 px-4 border-b">{product.sizes}</td>
                                    <td className="py-2 px-4 border-b">{product.category}</td>
                                    <td className="py-2 px-4 border-b">{product.stockQuantity}</td>
                                    <td className="py-2 px-4 border-b">
                                        <Button onClick={(e)=>{
                                            e.stopPropagation();
                                            setImages(product.shoeImages);
                                            setProductId(product._id);
                                            setModalOperation('edit');
                                            openModal(product);
                                        }} className="mr-2">Edit</Button>
                                        <Button onClick={(e)=>{
                                            e.stopPropagation();
                                            handleDelete(product._id)
                                        }} className="mr-2 bg-red-500 hover:bg-red-600 rounded-s-xl" variant="destructive">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ProductInventoryModal 
                isOpen={isOpen} 
                closeModal={closeModal} 
                inventoryData={inventoryData} 
                setInventoryData={setInventoryData} 
                category={category} 
                setCategory={setCategory}
                modalOperation={modalOperation}
                handleSubmit={handleSubmit}
                images={images}
                setImages={setImages}
                fileInputRef={fileInputRef}
                handleChange={handleChange}
                 />
            </div>
        </div>
    );
}
