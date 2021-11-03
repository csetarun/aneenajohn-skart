import axios from "axios";
import { BACKEND_URL } from "../backendUrl";
import { useCart } from "./cartContext";
// import { GetPrice } from "./getPrice";
export const processPayment = async (itemsInCart) => {
  // const { itemsInCart, dispatch: cartDispatch } = useCart();
  const totalPrice = () => {
    const amount = itemsInCart?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log("amount =", amount);
    return amount;
  };
  const price = totalPrice();
  console.log(`price= ${price}`);

  try {
    // console.log(amount);
    const res = await axios.post(`${BACKEND_URL}payment/orders`, { price });
    const { amount, id: order_id, currency } = res.data;

    const options = {
      key: "rzp_test_ra4lQFkeHoJ2RT", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "LingoKart",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature
        };
        alert(`Payment with order id ${data.orderCreationId} is Successful`);
        // const result = await axios.post(`${BACKEND_URL}payment/success`, {
        //   orderCreationId: order_id,
        //   razorpayPaymentId: response.razorpay_payment_id,
        //   razorpayOrderId: response.razorpay_order_id,
        //   razorpaySignature: response.razorpay_signature
        // });
        // alert(result.data.msg);
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (err) {
    console.log("err :", err);
  }
};
