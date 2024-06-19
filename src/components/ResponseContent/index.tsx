import { useEffect, useState } from "react";

import { Tabs } from "@enum";
import { HAR } from "@types";
import { decrypt, getDecryptKey } from "@utils";
import { CodeBlock } from "@components";
import { S } from "./styles";

type Props = {
  data?: HAR;
  tabKey: Tabs;
  apiId: HAR["apiId"];
};

function ResponseContent({ data, tabKey, apiId }: Props) {
  if (!data) return null;
  const key = getDecryptKey(data.request);
  if (!key) return <p style={{ fontSize: "2rem" }}>此套件不支援目前的網頁</p>;
  const [decode, setDecode] = useState<string>("{}");

  useEffect(() => {
    setDecode("{}");
    data?.getContent((val) => {
      const encode = val.slice(1, -1);
      setDecode(decrypt({ encode, key }));
    });
  }, [apiId]);

  switch (tabKey) {
    case Tabs.PREVIEW:
      return <CodeBlock src={JSON.parse(decode)} />;
    case Tabs.RESPONSE:
      return <S.Code>{JSON.stringify(JSON.parse(decode), null, 4)}</S.Code>;

    default:
      return null;
  }
}

export default ResponseContent;
