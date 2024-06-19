import ReactJson, { ReactJsonViewProps } from "@microlink/react-json-view";

import { S } from "./styles";

type Props = ReactJsonViewProps;

function CodeBlock({ ...rest }: Props) {
  return (
    <S.CodeBlock>
      <ReactJson
        theme="ashes"
        displayDataTypes={false}
        enableClipboard={true}
        quotesOnKeys={false}
        {...rest}
      />
    </S.CodeBlock>
  );
}

export default CodeBlock;
