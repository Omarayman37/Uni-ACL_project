import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, CheckoutLocale } from "@stripe/stripe-js";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from 'antd';
import Send_request from '../util/send_request';
import { useNavigate } from 'react-router-dom';

const public_key =
  "pk_test_51KHWXsLgiWcF7ZDaZjtY4a30WCMKUnX94ZJ0oRmtEsmcvddajlMkXaX9jfW5OhkcsUS8xz1EZRXb7dBPc4UYRiEa00D3YyVwsE";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(public_key);
function StripPayPage() {
  const navigate = useNavigate();
   
    return (
        <div>
          
           
        </div>
    )
}

export default StripPayPage
