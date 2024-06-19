import styled, { css } from "styled-components";

const hoverEffect = css`
  &:hover {
    background-color: ${({ theme }) => theme.code_background};
    opacity: 0.8;
  }
`;

export const S = {
  Sidebar: styled.section`
    width: 300px;
    height: 100%;
    background: transparent;
    border-right: 1px solid ${({ theme }) => theme.dark_white};
  `,
  List: styled.ul`
    width: 100%;
    height: calc(100% - 60px);
    list-style: none;
    overflow-y: auto;
  `,
  ListItem: styled.li<{ $isOdd: boolean; $isActive: boolean }>`
    font-size: 1.05rem;
    color: ${({ theme }) => theme.dark_white};
    padding: 1rem;
    background-color: ${({ theme, $isOdd, $isActive }) =>
      $isActive
        ? theme.grey
        : theme[$isOdd ? "item_light_background" : "item_dark_background"]};
    cursor: pointer;
    user-select: none;

    /* 省略號處理 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ $isActive }) => !$isActive && hoverEffect}
  `,
  ClearButton: styled.button`
    /* reset */
    border: none;
    outline: none;
    background: none;

    margin: 0.75rem;
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.code};
    border-radius: 5px;

    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.navy};
    cursor: pointer;
  `,
};
