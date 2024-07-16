import styled from 'styled-components';
import { PageProps } from './styleTypes';

export const SIDEBAR_WIDTH = '22%';

export const InputField = styled.input`
  font-family: 'Inter';
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  width: 100%;
  background-color: inherit;
  margin: 4px 0;
`;

export const InputContainer = styled.div`
  background-color: #131313;
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
`;

export const InputLabel = styled.label`
  color: #8f8f8f;
  display: block;
  font-size: 14px;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  outline: none;
  border: none;
  font-family: 'Inter';
  font-size: 16px;
  background-color: #6455c2;
  color: #fff;
  border-radius: 10px;
  padding: 25px 0;
  font-weight: 500;
  transition: 250ms background-color ease;
  &:hover {
    cursor: pointer;
    background-color: #483c97;
  }
  &:active {
    background-color: #4d409f;
  }
  &:disabled {
    background-color: #4937bc7c;
    color: #878787a2;
    cursor: not-allowed;
  }
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  background-color: #1a1a1a;
`;

export const ConversationSidebarStyle = styled.aside`
  background-color: #1a1a1a;
  border-right: 1px solid rgba(84, 84, 84, 28);
  position: absolute;
  top: 0;
  left: 0;
  width: ${SIDEBAR_WIDTH};
  height: 100%;

  & header {
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    align-items: center;
    border-bottom: 1px solid rgba(84, 84, 84, 28);
    height: 80px;

    & h1 {
      font-weight: 500;
      font-size: 20px;
    }
  }
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH};
`;
export const ConversationPanelStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH};
`;
