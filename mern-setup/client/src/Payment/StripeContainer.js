import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './Payment';

const PUBLIC_KEY="pk_test_51OHG5UHLO6dUyxTOMz5A8GL3xTOQfB8ijoLb9v6EJoo4XPmzwveNVKkKZudN6WZUytmNWCPzuTbAv7JLwYNA6D4Z00316eI6zY"
const stripeTest = loadStripe(PUBLIC_KEY)

export default function stripeContainer(){
    return(
        <Elements stripe={stripeTest}>
            <PaymentForm/>


        </Elements>
    )
}