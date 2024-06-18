import styled from "styled-components";

export const S = {
  Interface: styled.main`
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.code_background};

    display: flex;
  `,
  Title: styled.h1`
    color: red;
  `,
};
