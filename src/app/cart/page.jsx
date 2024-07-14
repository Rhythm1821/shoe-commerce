import { getCart } from "@/utils/api-client";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const cart = await getCart();
            setCart(cart);
        }
    }, [])
    return (
        <>
            <div>Cart</div>
            {
                JSON.stringify(cart)
            }
        </>
    )
}