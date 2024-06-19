import { HAR } from "@types";
import { decrypt, getDecryptKey, isPostApi } from "@utils";
import { CodeBlock } from "@components";

type Props = {
  data?: HAR["request"];
};

function RequestContent({ data }: Props) {
  if (!data || !isPostApi(data)) return null;

  const decode = decrypt({
    encode: JSON.parse(data.postData?.text || "").data,
    key: getDecryptKey(data),
  });

  return <CodeBlock src={JSON.parse(decode)} />;
}

export default RequestContent;
