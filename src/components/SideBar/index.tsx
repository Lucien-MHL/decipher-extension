import { HAR } from "@types";
import { S } from "./styles";

type Props = {
  onClear: () => void;
  onActive: (ApiId: HAR["apiId"]) => void;
  apiList: HAR[];
  apiId: HAR["apiId"] | null;
};

function Sidebar(props: Props) {
  const { apiList, onActive, onClear } = props;

  return (
    <S.Sidebar>
      <S.ClearButton onClick={onClear}>Clear</S.ClearButton>
      <S.List>
        {apiList.map((api, i) => (
          <S.ListItem
            $isOdd={i % 2 === 0}
            $isActive={api.apiId === props.apiId}
            key={api.apiId}
            onClick={() => onActive(api.apiId)}
          >
            {getUrlPath(api.request.url)}
          </S.ListItem>
        ))}
      </S.List>
    </S.Sidebar>
  );
}

const getUrlPath = (url: string) => {
  const urlObj = new URL(url);
  return urlObj.pathname;
};

export default Sidebar;
