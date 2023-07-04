import { useState } from "react";
import { ItemNS } from "../types";
import { UserContext } from "../components/providers/user.provider";
import { itemService } from "../services";
import React from "react";

interface Iprops {
  selectedItems: {
    item: ItemNS.Item;
    number: number;
  }[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<
      {
        item: ItemNS.Item;
        number: number;
      }[]
    >
  >;
  index: number;
}
const useSellCard = (props: Iprops) => {
  const { index, selectedItems, setSelectedItems } = props;
  const user = React.useContext(UserContext)
  const [dragOffsetX, setDragOffsetX] = useState<{ start: number, end: number }>({ start: 0, end: 0 });
  const handleCounter = async (status: 'increment' | 'decrement') => {
    let newArray = [...selectedItems];
    switch (status) {
      case 'increment':
        const item = selectedItems[index].item
        try {
          await itemService.updateItem({ ...item, quantity: item.quantity - 1 }, user.user?.token as string)
          newArray[index] = { item: { ...item, quantity: item.quantity - 1 }, number: selectedItems[index].number + 1 };
          setSelectedItems([...newArray]);
        } catch (error) {
          console.error(error)
        }
        break;
      case 'decrement':
        if (newArray[index].number >= 2) {
          try {
            const item = selectedItems[index].item
            await itemService.updateItem({ ...item, quantity: item.quantity + 1 }, user.user?.token as string)
            newArray[index] = { item: { ...item, quantity: item.quantity + 1 }, number: selectedItems[index].number - 1 };
            setSelectedItems([...newArray]);
          } catch (error) {
            console.error(error)
          }
        } else {
          try {
            const item = selectedItems[index].item
            await itemService.updateItem({ ...item, quantity: item.quantity + selectedItems[index].number }, user.user?.token as string)
            newArray.splice(index, 1);
            setSelectedItems([...newArray]);
          } catch (error) {
            console.error(error)
          }
        }
        break;
      default:
        break;

    }
  }
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragOffsetX({ start: e.pageX, end: 2 });
  };
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setDragOffsetX({ start: dragOffsetX.start, end: e.clientX });
  }
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setTimeout(async () => {
      const offsetX = e.clientX - dragOffsetX.start;
      if (Math.abs(offsetX) > 150) {
        let newArray = selectedItems;
        try {
          const item = selectedItems[index].item
          await itemService.updateItem({ ...item, quantity: item.quantity + selectedItems[index].number }, user.user?.token as string)
          newArray.splice(index, 1);
          setSelectedItems([...newArray]);
        } catch (error) {
          console.error(error)
        }
      }
    });
  }
  return ({
    handleCounter,
    handleDragStart,
    handleDrag,
    handleDragEnd
  });
};


export default useSellCard;