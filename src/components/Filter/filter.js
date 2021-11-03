export function getFilteredData(
  productList,
  showInventoryAll,
  showFastDeliveryOnly
) {
  return productList
    .filter(({ inStock }) => (showInventoryAll ? true : inStock))
    .filter(({ fastDelivery }) => (showFastDeliveryOnly ? fastDelivery : true));
}
