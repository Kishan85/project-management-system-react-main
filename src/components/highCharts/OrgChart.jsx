import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import sankey from "highcharts/modules/sankey";
import organization from "highcharts/modules/organization";
import highchartsExporting from "highcharts/modules/exporting";
import OfflineExporting from "highcharts/modules/offline-exporting";
import exportData from "highcharts/modules/export-data";
import { organizationalAPI } from "../../api/dashboard/planList";
import useLogout from "../../utils/useLogout";
import { Block, Icon } from "../Component";
import { Button } from "reactstrap";

// Ensure modules are loaded
if (typeof Highcharts === "object") {
  sankey(Highcharts); // Import Sankey before Organization
  organization(Highcharts);
  highchartsExporting(Highcharts);
  OfflineExporting(Highcharts);
  exportData(Highcharts); // Ensure export-data module is initialized
}

const OrgChart = () => {
  const [chartData, setchartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  const logout = useLogout();

  const fetchChartData = async () => {
    try {
      const response = await organizationalAPI();
      if (response.data.status === "success") {
        setchartData(response?.data?.data);
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
    fetchChartData();
  }, []);

  const highlightConnectedNodes = (point, chart) => {
    // Reset previous selection
    chart.series[0].data.forEach((link) => link.setState(""));
    chart.series[0].nodes.forEach((node) => node.setState(""));
    console.log("selected Node", selectedNode);

    if (selectedNode === point.id) {
      setSelectedNode(null); // Reset if same node clicked again
    } else {
      setSelectedNode(point.id);

      // Highlight clicked node
      point.setState("hover");

      // Highlight all connected nodes
      chart.series[0].data.forEach((link) => {
        if (link.from === point.id || link.to === point.id) {
          link.setState("hover");

          // Highlight connected nodes
          chart.series[0].nodes.forEach((node) => {
            if (node.id === link.from || node.id === link.to) {
              node.setState("hover");
            }
          });
        }
      });
    }
  };

  const options = {
    chart: {
      type: "organization",
      height: 600,
      inverted: true, // 👈 This makes it vertical
    },
    title: {
      text: "Company Organizational Structure",
    },
    series: [
      {
        nodeWidth: "350", // 👈 Increase box width
        nodePadding: "500", // 👈 Increase spacing between boxes
        dataLabels: {
          style: {
            fontSize: "8px", // 👈 Increase font size inside boxes
          },
        },
        states: {
          inactive: {
            //opacity: 1,
            enabled: false,
          },
          hover: {
            enabled: false,
          },
          select: {
            enabled: false,
          },
        },
      },

      {
        levels: [
          {
            level: 0,
            color: "silver",
            dataLabels: {
              color: "black",
            },
            height: 25,
          },
          {
            level: 1,
            color: "silver",
            dataLabels: {
              color: "black",
            },
            height: 25,
          },
          {
            level: 2,
            color: "#980104",
          },
          {
            level: 4,
            color: "#359154",
          },
        ],
        data: [
          ["company_1", "dept_1"],
          ["dept_1", "des_1"],
          ["des_1", "emp_1"],
          ["des_1", "emp_2"],
          ["des_1", "emp_5"],
          ["des_1", "emp_9"],
          ["des_1", "emp_10"],
          ["des_1", "emp_11"],
          ["dept_1", "des_2"],
          ["des_2", "emp_6"],
          ["des_2", "emp_7"],
          ["des_2", "emp_8"],
          ["des_2", "emp_3"],
          ["dept_1", "des_3"],
          ["des_3", "emp_4"],
          ["dept_1", "des_4"],
          ["dept_1", "des_6"],
          ["company_1", "dept_2"],
          ["company_1", "dept_3"],
          ["company_1", "dept_4"],
        ],
        nodes: [
          {
            id: "company_1",
            title: "Company",
            name: "Quaere",
          },
          {
            id: "dept_1",
            title: "Department",
            name: "Open Source",
          },
          {
            id: "des_1",
            title: "Designation (Level 6)",
            name: "Software Developer",
          },
          {
            id: "emp_1",
            title: "Employee",
            name: "Subhra Verma",
          },
          {
            id: "emp_2",
            title: "Employee",
            name: "VarunDeep Pal",
          },
          {
            id: "emp_5",
            title: "Employee",
            name: "Anjani Yadav",
          },
          {
            id: "emp_9",
            title: "Employee",
            name: "Abhishek shukla",
          },
          {
            id: "emp_10",
            title: "Employee",
            name: "Sandhya Yadav",
          },
          {
            id: "emp_11",
            title: "Employee",
            name: "Sikha Yadav",
          },
          {
            id: "des_2",
            title: "Designation (Level 5)",
            name: "Senior Software Developer",
          },
          {
            id: "emp_6",
            title: "Employee",
            name: "Anjani qq",
          },
          {
            id: "emp_7",
            title: "Employee",
            name: "Anjani jhb",
          },
          {
            id: "emp_8",
            title: "Employee",
            name: "Anjanie e",
          },
          {
            id: "emp_3",
            title: "Employee",
            name: "kishan triphati",
          },
          {
            id: "des_3",
            title: "Designation (Level 4)",
            name: "Team Leader",
          },
          {
            id: "emp_4",
            title: "Employee",
            name: "Manan Srivastava",
          },
          {
            id: "des_4",
            title: "Designation (Level 2)",
            name: "Senior VP",
          },
          {
            id: "des_6",
            title: "Designation (Level 2)",
            name: "Manager",
          },
          {
            id: "dept_2",
            title: "Department",
            name: "HR",
          },
          {
            id: "dept_3",
            title: "Department",
            name: "QA",
          },
          {
            id: "dept_4",
            title: "Department",
            name: "Java",
          },
        ],

        colorByPoint: true,
        borderColor: "#000",
        borderWidth: 1,
        point: {
          events: {
            click: function () {
              highlightConnectedNodes(this, this.series.chart);
            },
          },
        },
      },
    ],
  };

  return (
    <>
      <div style={{ width: "100%", overflowX: "auto" }}>
        {/* 👇 Increase box height via CSS */}
        <style>
          {`
          .highcharts-node rect {
            width: 600px !important; /* ✅ Correct width */
            height: 120px !important; /* ✅ Correct height */
          }
            h4 {
                font-size: 16px;
                color: #fff;
            }
            p{
            font-size: 12px;
                color: #fff;
            }

        `}
        </style>
    
        <Block>
          <div className="text-end">
            <Button
              outline
              id="back"
              color="primary"
              onClick={() => window.history.back()}
              size="sm"
              aria-label="Go back"
            >
              <Icon name="arrow-left" /> Back
            </Button>
          </div>
        </Block>
        <HighchartsReact highcharts={Highcharts} options={chartData} />
      </div>
    </>
  );
};

export default OrgChart;
