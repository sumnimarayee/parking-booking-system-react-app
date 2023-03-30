import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { userData } from "./data";
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// import 'bootstrap/dist/css/bootstrap.min.css';

const UsersTable = () => {
  const [perPage, setPerPage] = useState(10);
  //   const { SearchBar } = Search;

  const emailFormatter = (data, row) => {
    return <div onClick={() => console.log(row)}>email = {data}</div>;
  };

  const columns = [
    { dataField: "id", text: "UserID" },
    { dataField: "name", text: "Name", sort: true, filter: textFilter() },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      formatter: emailFormatter,
    },
    { dataField: "phone", text: "Phone", sort: true },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const paginationOptions = {
    custom: true,
    totalSize: userData.length,
    sizePerPageList: [
      { text: "10", value: 10 },
      { text: "20", value: 20 },
      { text: "50", value: 50 },
      { text: "All", value: userData.length },
    ],
    onSizePerPageChange: (sizePerPage) => setPerPage(sizePerPage),
    paginationTotalRenderer: customTotal,
  };

  return (
    // <ToolkitProvider
    //    keyField="id"
    //    data={userData}
    //    columns={columns}
    //    search
    //  >
    // {(props) => (
    // <div>
    // <SearchBar {...props.searchProps} />
    // <hr />
    <BootstrapTable
      data={userData}
      columns={columns}
      keyField="id"
      //   {...props.baseProps}
      //   bootstrap4
      //   headerClasses="table-header"
      hover
      condensed
      striped
      pagination={paginationFactory()}
      filter={filterFactory()}
    />
    // </div>
    // )}
    // </ToolkitProvider>
  );
};

export default UsersTable;
