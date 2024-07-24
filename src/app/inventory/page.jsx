'use client'
import { Button } from "@/components/ui/button";
import { addToInventory, fetchInventory } from "@/utils/api-client";
import { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

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
    const [isOpen, setIsOpen] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(null);
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
                setIsOpen(false); // Close the modal
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

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

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
            <Button onClick={openModal} className="bg-blue-500 text-white p-2 rounded-full mb-4">+</Button>
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
                                <tr key={product._id} onClick={()=> window.open(`/product/${product._id}`, '_blank')} className="cursor-pointer hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{product.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        {showFullDescription === product._id 
                                            ? product.description 
                                            : truncateDescription(product.description, 30)}
                                        {product.description.length > 10 && (
                                            <button 
                                                className="text-blue-500 ml-2" 
                                                onClick={() => setShowFullDescription(showFullDescription === product._id ? null : product._id)}
                                            >
                                                {showFullDescription === product._id ? <p className="text-sm">Show less</p> : <h6 className="text-sm">More...</h6>}
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
                                        <Button className="mr-2">Edit</Button>
                                        <Button className="mr-2" variant="destructive">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Add New Product
                                        </Dialog.Title>
                                        <form onSubmit={handleSubmit} method="post" className="mt-2 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <input className="border p-2" type="text" value={inventoryData.name} onChange={handleChange} name="name" placeholder="Name" />
                                                <input className="border p-2" type="text" value={inventoryData.description} onChange={handleChange} name="description" placeholder="Description" />
                                                <input className="border p-2" type="text" value={inventoryData.price} onChange={handleChange} name="price" placeholder="Price" />
                                                <input className="border p-2" type="text" value={inventoryData.brand} onChange={handleChange} name="brand" placeholder="Brand" />
                                                <input className="border p-2" type="text" value={inventoryData.material} onChange={handleChange} name="material" placeholder="Material" />
                                                <input className="border p-2" type="text" value={inventoryData.color} onChange={handleChange} name="color" placeholder="Color" />
                                                <input className="border p-2" type="text" value={inventoryData.sizes} onChange={handleChange} name="sizes" placeholder="Sizes" />
                                                <select className="border p-2" value={category} onChange={(e) => setCategory(e.target.value)} name="category">
                                                    <option value="">Select Category</option>
                                                    <option value="Formal">Formal</option>
                                                    <option value="Casual">Casual</option>
                                                    <option value="Sports">Sports</option>
                                                    <option value="Ethnic">Ethnic</option>
                                                    <option value="Boots">Boots</option>
                                                </select>
                                                <input className="border p-2" type="text" value={inventoryData.stockQuantity} onChange={handleChange} name="stockQuantity" placeholder="Stock Quantity" />
                                                <input className="border p-2" type="file" multiple onChange={(e) => setImages(e.target.files)} ref={fileInputRef} name="image" placeholder="Image" />
                                            </div>
                                            <Button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</Button>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
}
