import styled from "styled-components";

export const S = {
  Sidebar: styled.section`
    width: 300px;
    height: 100%;
    background: transparent;
    border-right: 1px solid ${({ theme }) => `${theme.dark_white}80`};
  `,
  List: styled.ul`
    width: 100%;
    height: 100%;
    list-style: none;
    overflow-y: auto;
  `,
  ListItem: styled.li<{ $isOdd: boolean }>`
    font-size: 1.05rem;
    color: ${({ theme }) => theme.dark_white};
    padding: 1rem;
    background-color: ${({ theme, $isOdd }) =>
      theme[$isOdd ? "item_light_background" : "item_dark_background"]};
    cursor: pointer;

    /* 省略號處理 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background-color: ${({ theme }) => theme.code_background};
      opacity: 0.8;
    }
  `,
};
