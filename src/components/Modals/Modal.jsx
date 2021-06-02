import React from "react";
import { Modal as AntdModal } from "antd";
import styled from "styled-components";
import { noop as NOOP } from "lodash";

const StyledModal = styled(AntdModal)`
    .ant-modal-header{
        background-color: #08142c;
    };
    .ant-modal-close{
        color:white;
    }
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
`;

const Title = styled.div`
  margin-right: 0.5rem;
  flex: 1;
  overflow: hidden;
  color: white;
`;

const Content = styled.div`
  flex: 1;
  padding-top: 0.5rem;
  ${(props) => props.$Overflow};
`;

const Modal = ({ children, title, bodyStyle = {}, overflow, ...props }) => {
  // const { onCancel = NOOP } = props;
  return (
    <StyledModal
      visible
      footer={null}
      title={
        <Title >{title}</Title>
     }
      centered
      bodyStyle={{
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        ...bodyStyle,
      }}
      {...props}
    >
      <Content $Overflow={`overflow: ${overflow ? overflow : "auto"};`}>{children}</Content>
    </StyledModal>
  );
};

export default Modal;