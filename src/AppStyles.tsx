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
  Content: styled.div`
    width: calc(100% - 300px);
    height: 100%;
  `,
  Wrap: styled.div`
    width: 100%;
    height: calc(100% - 38px);
    overflow-y: auto;
  `,
};
