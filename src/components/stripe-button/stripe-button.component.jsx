import React from "react";

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51K4GsLKqHSniwKAUqTWlBy8Ml8toZIOkb5n5i9Un1DplgNGwL2nPfQFiMBOfPsRLBjPUqqq0SnVrunxRPa2Hiif600ETWYoY39';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    
    return (
        <StripeCheckout
        label="Pay Now"
        name="Max Crwn Clothing Co, Ltd."
        billingAddress
        shippingAddress
        image="https://img.icons8.com/ios-filled/50/000000/crown.png"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey} />
    )
}

export default StripeCheckoutButton;