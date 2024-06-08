import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
 
    const {id} = useParams();
    // console.log(id)

    return (
        <div className="w-10/12 mx-auto">
            Please Pay
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                    id={id}
                    ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;