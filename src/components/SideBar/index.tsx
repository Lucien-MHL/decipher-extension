import { HAR } from "@types";
import { S } from "./styles";

type Props = {
  onActive: (ApiId: HAR["apiId"]) => void;
  apiList: HAR[];
};

function Sidebar(props: Props) {
  const { apiList, onActive } = props;

  return (
    <S.Sidebar>
      <S.List>
        {apiList.map((api, i) => (
          <S.ListItem
            $isOdd={i % 2 === 0}
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
