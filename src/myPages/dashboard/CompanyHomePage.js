import React from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Row,
} from "../../components/Component";

const CompanyHomePage = () => {
  return (
    <>
      <Head title="Company name" />
      <Content>
        <BlockHead size={"lg"}>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h2" className={`fw - normal`}>
                Dashboard
              </BlockTitle>
              <BlockDes>
                <p>Welcome to your dashboard. Manage your account and your subscriptions.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className={`g-gs`}></Row>
        </Block>
      </Content>
    </>
  );
};

export default CompanyHomePage;
