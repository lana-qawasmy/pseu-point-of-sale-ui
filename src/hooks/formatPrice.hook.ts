const formatPrice = (price: Number | number) =>{
    return price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 });
  };

  export default formatPrice;