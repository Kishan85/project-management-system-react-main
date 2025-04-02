import React, { useEffect } from "react";
import Head from "./head/Head";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import Header from "./header/Header";
import { Outlet } from "react-router";
import MyHeader from "./header/MyHeader";
import Footer from "./footer/Footer";

const MyLayout = ({title,...props}) => {
  useEffect(() => {
    document.body.classList.add("has-aside");
    document.body.classList.remove("npc-apps", "apps-only");
  }, []);
  return (
    <>
      <Head title={!title && "Loading"} />
      <AppRoot>
        <AppMain>
          <AppWrap>
            <MyHeader fixed />
            <div className="nk-content">
              <div className="container">
                <div className="nk-content-inner">
                  <div className="nk-content-body">
                    <Outlet />
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </AppWrap>
        </AppMain>
      </AppRoot>
    </>
  );
};

export default MyLayout;
