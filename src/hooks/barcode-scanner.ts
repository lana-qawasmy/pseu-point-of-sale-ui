import { useState } from "react";
import { useZxing } from "react-zxing";

const useBarcode = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });
  return {result, ref};
};

export default useBarcode;


