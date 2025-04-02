import React from "react";
import { Col, PreviewAltCard, Row } from "../Component";
import DataTable from "react-data-table-component";
import { CardHeader, Spinner } from "reactstrap";

const MyDataTable = ({ data, columns, title, isLoading }) => {
  return (
    <>
      <Row>
        <Col sm="12">
          <PreviewAltCard className={`h-100`}>
            <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h5>{title}</h5>
              </div>
            </CardHeader>
            <div className="nk-data data-list">
              <DataTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                pagination
                paginationResetDefaultPage={false}
                progressComponent={
                  <Spinner
                    color="primary"
                    style={{
                      height: "3rem",
                      width: "3rem",
                    }}
                    type="grow"
                  >
                    Loading...
                  </Spinner>
                }
                subHeader={false}
                persistTableHead
                onColumnOrderChange
                striped={true}
                responsive={true}
                highlightOnHover
                paginationRowsPerPageOptions={[25, 50, 100, 500]}
                paginationPerPage={25}
              />
            </div>
          </PreviewAltCard>
        </Col>
      </Row>
    </>
  );
};

export default MyDataTable;
