import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function ProductInventoryModal({ isOpen, closeModal, inventoryData, setInventoryData, category, setCategory, modalOperation, handleSubmit, images, setImages, fileInputRef, handleChange, productId }) {
    const router = useRouter()
    const handleMoreClick = (event) => {
        window.open(`/product/${productId}`)
    }
    return (
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
                                    {modalOperation === 'add' ? 'Add Product' : 'Update Product'}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={inventoryData.name}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={inventoryData.description}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            ></textarea>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={inventoryData.price}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                                Brand
                                            </label>
                                            <input
                                                type="text"
                                                name="brand"
                                                value={inventoryData.brand}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                                                Material
                                            </label>
                                            <input
                                                type="text"
                                                name="material"
                                                value={inventoryData.material}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                name="color"
                                                value={inventoryData.color}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
                                                Sizes
                                            </label>
                                            <input
                                                type="text"
                                                name="sizes"
                                                value={inventoryData.sizes}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                                                Stock Quantity
                                            </label>
                                            <input
                                                type="number"
                                                name="stockQuantity"
                                                value={inventoryData.stockQuantity}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                Category
                                            </label>
                                            <select
                                                name="category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                <option value="" disabled>Select Category</option>
                                                <option value="Formal">Formal</option>
                                                <option value="Casual">Casual</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Ethnic">Ethnic</option>
                                                <option value="Boots">Boots</option>
                                            </select>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {images.slice(0, 2).map((image, index) => (
                                            <img width={120} key={index} height={100} src={image} alt="" style={{ marginRight: '8px' }} />
                                        ))}
                                        {images.length > 2 && (
                                            <button target='_blank' onClick={handleMoreClick} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>
                                                More...
                                            </button>
                                        )}
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                                Images
                                            </label>
                                            <input
                                                type="file"
                                                required
                                                name="images"
                                                multiple
                                                ref={fileInputRef}
                                                onChange={(e) => setImages([...e.target.files])}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
