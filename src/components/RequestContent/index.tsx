import ReactJson from "@microlink/react-json-view";

import { HAR } from "@types";
import { decrypt, getDecryptKey, isPostApi } from "@utils";
import { S } from "./styles";

type Props = {
  data?: HAR["request"];
};

function RequestContent({ data }: Props) {
  if (!data || !isPostApi(data)) return null;

  const decode = decrypt({
    encode: JSON.parse(data.postData?.text || "").data,
    key: getDecryptKey(data),
  });

  return (
    <S.CodeBlock>
      <ReactJson
        src={JSON.parse(decode)}
        theme="ashes"
        displayDataTypes={false}
        enableClipboard={true}
        quotesOnKeys={false}
      />
    </S.CodeBlock>
  );
}

export default RequestContent;
