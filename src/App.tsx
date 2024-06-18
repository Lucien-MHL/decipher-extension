import { useState, useEffect, useRef } from "react";

import { HAR } from "@types";
import { Sidebar } from "@components";
import { S } from "./AppStyles";

function App() {
  const [apiList, setApiList] = useState<HAR[]>([]);
  const idCounter = useRef(0); // Initialize a ref to keep track of IDs

  useEffect(() => {
    const handleNetworkRequestFinished = (har: Omit<HAR, "apiId">) => {
      if (har._resourceType === "xhr" || har._resourceType === "fetch") {
        console.log(har);
        setApiList((prev) => [...prev, { ...har, apiId: idCounter.current++ }]);
      }
    };

    chrome.devtools.network.onRequestFinished.addListener(
      handleNetworkRequestFinished
    );

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(
        handleNetworkRequestFinished
      );
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <S.Interface>
      <Sidebar onActive={(data) => console.log(data)} apiList={apiList} />
    </S.Interface>
  );
}

export default App;
