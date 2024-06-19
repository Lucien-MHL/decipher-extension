import CryptoJS from "crypto-js";

import { HAR } from "@types";

type DecryptProps = {
  encode: string;
  key: string;
};

export const decrypt = ({ encode, key }: DecryptProps) => {
  try {
    const decode = CryptoJS.AES.decrypt(encode, CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
    });
    return decode.toString(CryptoJS.enc.Utf8);
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};

export const getDecryptKey = (data: HAR["request"]) => {
  const getValueByKey = (key: string) =>
    data.headers.find((header) => header.name === key)?.value;

  if (data.url.includes("queryGameListForApp"))
    return getValueByKey("site")?.padStart(16, "1") || "";

  return `${getValueByKey("site")}${getValueByKey("siteTime")?.slice(-8)}`;
};

export const isPostApi = (data: HAR["request"] | undefined): boolean => {
  if (!data) return false;
  if (!data.postData) return false;

  return data.method === "POST" && !!data.postData.text;
};
