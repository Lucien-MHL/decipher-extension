import { HAR } from "@types";
import { decrypt, getDecryptKey, isPostApi } from "@utils";
import { CodeBlock } from "@components";

type Props = {
  data?: HAR["request"];
};

function RequestContent({ data }: Props) {
  if (!data || !isPostApi(data)) return null;
  const key = getDecryptKey(data);

  if (!key) return <p style={{ fontSize: "2rem" }}>此套件不支援目前的網頁</p>;
  const encode = JSON.parse(data.postData?.text || "").data;
  const decode = decrypt({ encode, key });

  return <CodeBlock src={JSON.parse(decode)} />;
}

export default RequestContent;
