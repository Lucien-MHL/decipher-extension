import { HAR } from "@types";
import { S } from "./styles";

type Props = {
  onActive: (ApiId: string) => void;
  apiList: HAR[];
};

function Sidebar(props: Props) {
  const { apiList, onActive } = props;
  return (
    <S.Sidebar>
      <S.List>
        {apiList.map((api) => (
          <S.ListItem key={api.apiId} onClick={() => onActive(api.apiId)}>
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
