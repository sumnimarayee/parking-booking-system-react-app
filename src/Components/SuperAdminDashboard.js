import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosprivate from "../hooks/useAxiosPrivate";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loader from "./Common/Loader";
import Modal from "./Modals/Modal";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";

const SuperAdminDashboard = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  let navigate = useNavigate();
  const axios = useAxiosprivate();

  const routeChange = () => {
    let path = "/add-parkinglot";
    navigate(path);
  };

  useEffect(() => {
    setLoader(true);
    async function fetch() {
      const fetchedData = await axios.get(`/parking-lot`);
      setData(fetchedData.data.data);
      setTableData(fetchedData.data.data);
    }
    fetch();
    setLoader(false);
  }, []);

  const handleDeleteConfirmation = (data) => {
    console.log("insdide handle detelete confirmation");
    console.log(data);
    setModal({ show: false });
    setLoader(true);
    const parkinglotIdToDelete = data.parkingLot._id;
    axios
      .delete(`/parking-lot/${parkinglotIdToDelete}`)
      .then((response) => {
        axios.get(`/parking-lot`).then((fetchedData) => {
          setTableData(fetchedData.data.data);
        });
        setModal({
          show: true,
          title: "Deleted",
          message: "The parking lot has been deleted",
          type: "success",
        });
      })
      .catch((err) => {
        setLoader(false);
      });
    setLoader(false);
  };

  const deleteParkingLotFormatter = (data, row) => {
    return (
      <div className="delete-parking-button">
        <button
          className="btn btn-outline-success"
          onClick={() => {
            setModal({
              show: true,
              title: "Confirm Delete",
              message: "Are you sure you want to delete this parking lot?",
              type: "confirmation",
              handleConfirmation: handleDeleteConfirmation,
              data: {
                parkingLot: row,
                setTableData: setTableData,
              },
            });
          }}
        >
          <DeleteForeverIcon />
        </button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "location",
      text: "Location",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "openingTime",
      text: "Opening Time",
    },
    {
      dataField: "closingTime",
      text: "Closing Time",
    },
    {
      dataField: "bikeParkingCapacity",
      text: "Two-Wheelers Capacity",
      sort: true,
      sort: true,
    },
    {
      dataField: "carParkingCapacity",
      text: "Four-Wheelers Capacity",
      sort: true,
      sort: true,
    },
    {
      dataField: "",
      text: "",
      formatter: deleteParkingLotFormatter,
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPageList: [10, 25, 50, 100],
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) => {},
    onSizePerPageChange: (page, sizePerPage) => {},
  });

  return (
    <div
      className="superadmin-dashboard-container"
      style={{
        padding: "10px",
      }}
    >
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          hideAfterSeconds={modal.hideAfterSeconds}
          handleConfirmation={modal.handleConfirmation}
          data={modal.data}
        />
      ) : (
        ""
      )}
      <div
        className="add-parkinglot-holder"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <button className="btn btn-primary" onClick={routeChange}>
          +Parking Lot
        </button>
      </div>
      <div>
        <BootstrapTable
          data={tableData}
          columns={columns}
          keyField="_id"
          //   {...props.baseProps}
          bootstrap4
          //   headerClasses="table-header"
          hover
          condensed
          striped
          pagination={pagination}
          filter={filterFactory()}
        />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
