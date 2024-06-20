import { HAR } from "@types";
import { decrypt, getDecryptKey, isPostApi } from "@utils";
import { CodeBlock } from "@components";

type Props = {
  data?: HAR["request"];
};

function RequestContent({ data }: Props) {
  if (!data || !isPostApi(data)) return "{}";

  const key = getDecryptKey(data);

  if (!data?.postData?.text) return "{}";

  if (!key) return <p style={{ fontSize: "2rem" }}>此套件不支援該 API</p>;
  const postDataText = JSON.parse(data.postData?.text || "{}");
  const isEncodeText = Object.keys(postDataText).includes("data");
  const decode = isEncodeText
    ? JSON.parse(decrypt({ encode: postDataText.data, key }))
    : postDataText;

  return <CodeBlock src={decode} />;
}

export default RequestContent;
