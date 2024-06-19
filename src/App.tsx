import { useState, useEffect, useRef } from "react";

import { HAR } from "@types";
import { Tabs } from "@enum";
import {
  Sidebar,
  TabSwitcher,
  RequestContent,
  ResponseContent,
} from "@components";
import { S } from "./AppStyles";

function App() {
  const [apiList, setApiList] = useState<HAR[]>([]);
  const idCounter = useRef(0); // Initialize a ref to keep track of IDs
  const [tabKey, setTabKey] = useState(Tabs.PAYLOAD);
  const [activeApiId, setActiveApiId] = useState<HAR["apiId"] | null>(null);

  // reset
  useEffect(() => {
    const handleTabChangeEvent = (
      _: number,
      changeInfo: chrome.tabs.TabChangeInfo
    ) => {
      console.log(changeInfo);
      const isRefresh =
        changeInfo.status === "loading" && Object.keys(changeInfo).length === 1;
      if (isRefresh) {
        setApiList([]);
        setActiveApiId(null);
      }
    };

    // 監聽頁籤更新事件
    chrome.tabs.onUpdated.addListener(handleTabChangeEvent);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabChangeEvent);
    };
  }, []);

  useEffect(() => {
    const handleNetworkRequestFinished = (har: Omit<HAR, "apiId">) => {
      if (har._resourceType === "xhr" || har._resourceType === "fetch") {
        setApiList((prev) => [
          ...prev,
          { ...har, apiId: idCounter.current++, getContent: har.getContent },
        ]);
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
        onClear={() => {
          setApiList([]);
          setActiveApiId(null);
        }}
        onActive={(apiId) => setActiveApiId(apiId)}
        apiList={apiList}
        apiId={activeApiId}
      />
      <S.Content>
        {activeApiId !== null && !!apiList.length && (
          <TabSwitcher tabKey={tabKey} onChange={setTabKey} />
        )}
        {activeApiId !== null && (
          <S.Wrap>
            {tabKey === Tabs.PAYLOAD && (
              <RequestContent
                data={apiList.find((api) => api.apiId === activeApiId)?.request}
              />
            )}
            {tabKey !== Tabs.PAYLOAD && (
              <ResponseContent
                tabKey={tabKey}
                apiId={activeApiId}
                data={apiList.find((api) => api.apiId === activeApiId)}
              />
            )}
          </S.Wrap>
        )}
      </S.Content>
    </S.Interface>
  );
}

export default App;
