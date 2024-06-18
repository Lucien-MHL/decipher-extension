import styled from "styled-components";

export const S = {
  Switcher: styled.ul`
    display: flex;
    align-items: center;
    width: 100%;
    list-style: none;
    background-color: ${({ theme }) => theme.item_dark_background};

    border-bottom: 1px solid ${({ theme }) => theme.dark_white};
    user-select: none;
  `,
  Tab: styled.li<{ $isActive: boolean }>`
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    color: ${({ theme, $isActive }) =>
      theme[$isActive ? "navy" : "dark_white"]};
    cursor: pointer;
    border-right: 1px solid ${({ theme }) => `${theme.dark_white}80`};
    background-color: ${({ theme, $isActive }) =>
      theme[$isActive ? "code" : "item_light_background"]};
  `,
};
