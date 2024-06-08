import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";


// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ id }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();



    const { data: joinedCamps = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['camps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinedCamps/${id}`);
            return res.data;
        }
    });

    // console.log(joinedCamps)
    const totalPrice = parseInt(joinedCamps[0]?.fees);


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    price: joinedCamps[0].fees,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    joinedCampId: joinedCamps[0]._id,
                    campId: joinedCamps[0].campId,
                    campName: joinedCamps[0].campName,
                    status: 'pending'
                }


                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    const upres = await axiosSecure.patch(`/joinedCamps/payment/${joinedCamps[0]._id}`, {}, {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    });

                    if (upres.data.modifiedCount) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for the taka paisa",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/paymentHistory')
                    }
                }


            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            {
                loading && <div className='flex justify-center'><span className="loading loading-bars loading-lg scale-150"></span></div>
            }
            <h1 className="badge badge-neutral p-4 text-2xl font-taj font-semibold my-2">{joinedCamps[0]?.fees}</h1>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;