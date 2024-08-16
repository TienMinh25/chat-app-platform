import styled from 'styled-components';
import { InputContainerProps, PageProps } from './style.type';

export const SIDEBAR_WIDTH = '22%';
export const SIDEBAR_HEIGHT = '80px';
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

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${(props) => props.backgroundColor || '#131313'};
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
`;

export const ConversationSidebarHeader = styled.header`
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid rgba(84, 84, 84, 28);
  padding: 0 24px;
  align-items: center;
  border-bottom: 1px solid rgba(84, 84, 84, 28);
  height: ${SIDEBAR_HEIGHT};
  position: fixed;
  left: 0;
  width: ${SIDEBAR_WIDTH};
  top: 0;

  & h1 {
    font-weight: 500;
    font-size: 20px;
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

export const ConversationSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  background-color: #131313;
`;

export const ConversationSibbarContainer = styled.div`
  margin-top: ${SIDEBAR_HEIGHT};
  overflow-y: scroll;
  max-height: calc(100% - ${SIDEBAR_HEIGHT});

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2d2d2d;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000c4;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  color: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;

  & h2 {
    font-weight: 500;
  }
`;

export const ModalContainerStyle = styled.div`
  background-color: #121212;
  width: 650px;
  border-radius: 10px;
`;

export const ModalContentBodyStyle = styled.div`
  padding: 18px;
`;

export const TextField = styled.textarea`
  font-family: 'Inter';
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  height: 100px;
  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
