import { useCart } from "./cartContext";

export const GetPrice = () => {
  const { itemsInCart } = useCart();
  return itemsInCart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
};
