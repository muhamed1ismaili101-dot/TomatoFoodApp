import Display from "../components/Display";
import '../../routes/components/Display.css'
import CartTotal from "../components/CartTotal";


export default function Cart(){
    return (
        <main className="cart-main">
            <Display/>
            <CartTotal/>
        </main>
    )
}