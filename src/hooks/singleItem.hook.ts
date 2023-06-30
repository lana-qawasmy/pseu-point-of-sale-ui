import { useParams, useNavigate } from "react-router-dom";
import { itemService } from "../services";
import { useContext } from "react";
import { UserContext } from "../components/providers/user.provider";
import useNotification from "./notification.hook";
import React from "react";
import { ItemNS } from "../types";
const useSingleItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { user } = useContext(UserContext);
  const { setNotification } = useNotification();
  const [item, setItem] = React.useState<ItemNS.Item>();
  const getItem = async () => {
    const response = await itemService.getItem(user?.token || "", id || "");
    if (typeof response === "object") {
      setItem({
        addedBy: response.addedBy,
        barcode: response.barcode,
        description: response.description,
        image: response.image,
        name: response.name,
        priceHistory: response.priceHistory,
        _id: response._id,
      });
    } else {
      setNotification({ message: response, status: "error", autoClose: 2000 });
      navigate("/");
    }
  };
  React.useMemo(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    id,
    item,
  };
};

export default useSingleItem;
