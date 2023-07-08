import React from "react";
import { UserContext } from "../components/providers/user.provider";
import useNotification from "./notification.hook";
import { discountService } from "../services";

const useDiscount = () => {
  const userContext = React.useContext(UserContext);

  const [discount, setDiscount] = React.useState<number>(0);
  const [discountCode, setDiscountCode] = React.useState<string>();
  const notification = useNotification();

  const handleDiscount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const discountValue = await discountService.getDiscount(
        discountCode || "",
        userContext.user?.token || ""
      );
      if (discountValue?.value) setDiscount(discountValue.value);
      else {
        setDiscount(0);
        notification.setNotification({
          message: "Discount code you entered is not valid! ",
          status: "error",
        });
      }
    } catch (error) {
      setDiscount(0);
      notification.setNotification({
        message: "Discount code you entered is not valid! ",
        status: "error",
      });
    }
  };

  return {
    discount,
    setDiscount,
    setDiscountCode,
    handleDiscount,
    discountCode,
  };
};

export default useDiscount;
