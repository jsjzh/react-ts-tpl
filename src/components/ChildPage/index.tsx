import React from "react";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";
import styled from "styled-components";
import { Button, Space } from "antd";

const ChildHeader = styled.div``;

const ChildBody = styled.div`
  min-height: 400px;
`;

const ChildFooter = styled.div`
  text-align: end;
`;

interface IProps {
  open: boolean;

  onOk?: () => void;
  onCancel?: () => void;

  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const ChildPage: React.FC<IProps> = (props) => {
  const Header = () => (props.header ? <>{props.header}</> : null);

  const Footer = () =>
    props.footer ? (
      <>{props.footer}</>
    ) : (
      <Space>
        <Button onClick={props.onCancel}>取消</Button>
        <Button type="primary" onClick={props.onOk}>
          确认
        </Button>
      </Space>
    );

  if (!props.open) return null;

  return (
    <PageWrapper>
      <ChildHeader>
        <Header />
      </ChildHeader>
      <ChildBody>{props.children}</ChildBody>
      <ChildFooter>
        <Footer />
      </ChildFooter>
    </PageWrapper>
  );
};

export default ChildPage;
