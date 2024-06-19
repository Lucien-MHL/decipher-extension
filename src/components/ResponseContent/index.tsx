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
  const [decode, setDecode] = useState<string>("{}");

  useEffect(() => {
    setDecode("{}");
    data?.getContent((val) => {
      const encode = val.slice(1, -1);
      const temp = decrypt({
        encode,
        key: getDecryptKey(data?.request || {}),
      });
      setDecode(temp);
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
