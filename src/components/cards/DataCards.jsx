import React from "react";
import { CleanBar, CleanLine } from "../../pages/components/campaign/CampaignCharts"
const DataCards = ({ cardData }) => {

  var runningCampaign = {
    labels: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan"],
    dataUnit: 'Running Campaign',
    datasets: [{
      label: "People",
      lineTension: .3,
      borderWidth: 1,
      fill: true,
      color: "#fff",
      backgroundColor: "rgba(255,255,255,.15)",
      borderColor: "#fff",
      pointBorderColor: "transparent",
      pointBackgroundColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 1,
      pointRadius: 4,
      pointHitRadius: 4,
      data: [85, 125, 105, 115, 130, 106, 141]
    }]
  };
  return (
    <>

      {cardData.map((item, index) => (
        <div key={index} className={`col-sm-3`}>
          <div className="card" style={{ backgroundColor: item.color, borderRadius: "12px" }}>
            <div className="card-inner pt-3">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <div className="fs-6 text-white text-opacity-75 mb-0">{item.title}</div>
              </div>
              <h5 className="fs-1 text-white">{item.count}</h5>
            </div>
            <div className="nk-ck-wrap mt-auto overflow-hidden rounded-bottom">
              <div className="nk-cmwg1-ck">
                <CleanLine data={runningCampaign} className="campaign-line-chart-s1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DataCards;
