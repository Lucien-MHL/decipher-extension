import { Tabs } from "@enum";
import { S } from "./styles";

type Props = {
  tabKey: Tabs;
  onChange: (tab: Tabs) => void;
};

function TabSwitcher({ tabKey, onChange }: Props) {
  const tabs = Object.values(Tabs);

  return (
    <S.Switcher>
      {tabs.map((tab) => (
        <S.Tab
          onClick={() => onChange(tab)}
          key={tab}
          $isActive={tabKey === tab}
        >
          {tab}
        </S.Tab>
      ))}
    </S.Switcher>
  );
}

export default TabSwitcher;
