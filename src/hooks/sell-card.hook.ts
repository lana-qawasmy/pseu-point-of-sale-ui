import { useState } from "react";
import { ItemNS } from "../types";

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
const useSellCard = (props: Iprops) =>{
    const {index, selectedItems, setSelectedItems} = props;
    const [dragOffsetX, setDragOffsetX] = useState<{start: number, end: number}>({start:0,end: 0});
    const handleCounter = (status: 'increment' | 'decrement')=>{
        let newArray = [...selectedItems];
        switch (status){
            case 'increment':
                newArray[index] = {item: selectedItems[index].item, number: selectedItems[index].number + 1};
                setSelectedItems([...newArray]);
                break;
            case 'decrement':
                if(newArray[index].number >= 2){
                    newArray[index] = {item: selectedItems[index].item, number: selectedItems[index].number - 1};
                    setSelectedItems([...newArray]);
                }else{
                    newArray.splice(index,1);
                    setSelectedItems([...newArray]);
                }
                break;
            default:
                break;

        }
    }
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setDragOffsetX({start: e.pageX, end: 2});
      };
      const handleDrag = (e:React.DragEvent<HTMLDivElement>) =>{
        setDragOffsetX({start: dragOffsetX.start, end: e.clientX});
      }
      const handleDragEnd = (e:React.DragEvent<HTMLDivElement>) =>{
        setTimeout(() => {
            const offsetX = e.clientX - dragOffsetX.start;
            if(Math.abs(offsetX) > 150){
                let newArray = selectedItems;
                newArray.splice(index, 1);
                setSelectedItems([...newArray]);
            }
          });
      }
      return({
        handleCounter,
        handleDragStart,
        handleDrag,
        handleDragEnd
      });
};


export default useSellCard;