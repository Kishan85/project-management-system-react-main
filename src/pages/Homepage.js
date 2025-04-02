import React, { useEffect, useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";

import SaleRevenue from "../components/partials/default/sale-revenue/SaleRevenue";
import ActiveSubscription from "../components/partials/default/active-subscription/ActiveSubscription";
import AvgSubscription from "../components/partials/default/avg-subscription/AvgSubscription";
import SalesOverview from "../components/partials/default/sales-overview/SalesOverview";
import TransactionTable from "../components/partials/default/transaction/Transaction";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import Support from "../components/partials/default/support-request/Support";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
  BlockBetween,
  PreviewCard,
  PieChartExample,
  DoughnutExample,
  PolarExample,
} from "../components/Component";
import DataCards from "../components/cards/DataCards";
import { dashboardAPI } from "../api/dashboard/planList";
import useLogout from "../utils/useLogout";
const Homepage = () => {
  const [sm, updateSm] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout();

  const fetchDashboard = async () => {
    try {
      const response = await dashboardAPI();
      if (response.data.status === "success") {
        setCardData(response?.data?.data?.cardData);
        setIsLoading(false);
      } else if (response.data.status == "failed") {
        setIsLoading(false);
      } else if (response.data.status == "expired") {
        logout(response.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const doughnutChartData = {
    labels: ["Pending", "Progress", "Completed"],
    dataUnit: "BTC",
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["rgba(156, 171, 255, 0.8)", "rgba(244, 170, 164, 0.8)", "rgba(143, 234, 197, 0.8)"],
        data: [0, 2, 2],
      },
    ],
  };
 

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Company Overview
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Company Overview</p>
              </BlockDes>
            </BlockHeadContent>
            {/* <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <DataCards cardData={cardData} />{" "}

            {/* <Col sm="6">
              <PreviewAltCard>
                <ActiveSubscription />
              </PreviewAltCard>
            </Col> */}
            {/* <Col sm="6">
              <PreviewAltCard>
                <AvgSubscription />
              </PreviewAltCard>
            </Col> */}
            {/* <Col xl="6">
              <PreviewAltCard className="h-100">
                <SaleRevenue />
              </PreviewAltCard>
            </Col> */}
            {/* <Col xl="6">
              <PreviewAltCard className="h-100">
                <SalesOverview />
              </PreviewAltCard>
            </Col> */}
            {/* <Col size="12">
              <Card className="card-bordered card-full">
                <TransactionTable />
              </Card>
            </Col> */}
            {/* <Col lg="6">
              <Card className="card-bordered card-full">
                <RecentActivity />
              </Card>
            </Col> */}
            {/* <Col lg="6">
              <Card className="card-bordered h-100">
                <Support />
              </Card>
            </Col> */}
          </Row>
        </Block>
         {/* <Block size="lg">
                  <BlockHead>
                    <BlockHeadContent>
                      <BlockTitle tag="h4">Pie & Doughnut Charts</BlockTitle>
                      <BlockDes>
                        <p>
                          Pie and doughnut charts are probably the most commonly used charts. It use to show relational
                          proportions between data.
                        </p>
                      </BlockDes>
                    </BlockHeadContent>
                  </BlockHead>
                  <Row className="g-gs">
                   
                    <Col md={4}>
                      <PreviewCard>
                        <div className="card-head text-center">
                          <h6 className="title">Doughnut Chart</h6>
                        </div>
                        <div className="nk-ck-sm">
                          <DoughnutExample data={doughnutChartData} />
                        </div>
                      </PreviewCard>
                    </Col>
                    
                  </Row>
                </Block> */}
      </Content>

    </React.Fragment>
  );
};
export default Homepage;
