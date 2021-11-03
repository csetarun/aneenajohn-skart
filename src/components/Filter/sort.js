export function getSortedData(productList, sortBy) {
  // console.log("sortBy inside sorting function", sortBy);
  switch (sortBy) {
    case "PRICE_HIGH_TO_LOW":
      return productList.sort((a, b) => b["price"] - a["price"]);
    case "PRICE_LOW_TO_HIGH":
      return productList.sort((a, b) => a.price - b.price);
    case "en":
      return productList.filter((product) => product.language === "en");
    case "es":
      return productList.filter((product) => product.language === "es");
    case "hi":
      return productList.filter((product) => product.language === "hi");
    case "ta":
      return productList.filter((product) => product.language === "ta");
    case "All":
      return productList;
    default:
      return productList;
  }
}
