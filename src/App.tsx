import { useState, useEffect, useRef } from "react";

import { HAR } from "@types";
import { Tabs } from "@enum";
import { Sidebar, TabSwitcher, RequestContent } from "@components";
import { S } from "./AppStyles";

function App() {
  const [apiList, setApiList] = useState<HAR[]>([]);
  const idCounter = useRef(0); // Initialize a ref to keep track of IDs
  const [tabKey, setTabKey] = useState(Tabs.PAYLOAD);
  const [activeApiId, setActiveApiId] = useState<HAR["apiId"] | null>(null);

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

    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(
        handleNetworkRequestFinished
      );
    };
  }, []);

  return (
    <S.Interface>
      <Sidebar
        onActive={(apiId) => setActiveApiId(apiId)}
        apiList={apiList}
        apiId={activeApiId}
      />
      <S.Content>
        {!!apiList.length && (
          <TabSwitcher tabKey={tabKey} onChange={setTabKey} />
        )}
        {!!activeApiId && (
          <S.Wrap>
            <RequestContent />
          </S.Wrap>
        )}
      </S.Content>
    </S.Interface>
  );
}

export default App;
