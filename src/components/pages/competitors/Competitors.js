import "./competitors.css";
import * as React from "react";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
} from "@mui/x-data-grid";
import axios from "axios";
import { Button, Stack, buttonBaseClasses } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Competitors() {
  const [userData, setUserData] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState(null);
  const body = { test: "test" };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const XLSX = require("sheetjs-style");
  const [dateBegin, setDateBegin] = React.useState(null);
  const [dateEnd, setDateEnd] = React.useState(null);

  const filterParcelDate = () => {
    //let selectedDate = new Date(dateFilter.$d).toLocaleString('en-us',{month:'numeric', timeZone: 'Asia/Manila'});
    let month = new Date(dateFilter.$d).toLocaleString("en-us", {
      month: "numeric",
      timeZone: "Asia/Manila",
    });
    let day = new Date(dateFilter.$d).toLocaleString("en-us", {
      day: "numeric",
      timeZone: "Asia/Manila",
    });
    let year = new Date(dateFilter.$d).toLocaleString("en-us", {
      year: "numeric",
      timeZone: "Asia/Manila",
    });

    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    const selectedDate = year + "-" + month + "-" + day;
    console.log(selectedDate);
    getDate(selectedDate);
  };

  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 50,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "inputId",
      headerName: "Input ID",
      width: 150,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "merchandiserName",
      headerName: "Merchandiser Name",
      width: 200,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "outlet",
      headerName: "Outlet",
      width: 200,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "store",
      headerName: "Store",
      width: 200,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "company",
      headerName: "Company",
      width: 200,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 200,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "promotionalType",
      headerName: "Promotional Type",
      width: 250,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "promotionalTypeDetails",
      headerName: "Promo Type Details",
      width: 350,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "displayLocation",
      headerName: "Display Location",
      width: 250,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pricing",
      headerName: "Pricing",
      width: 200,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "durationOfPromo",
      headerName: "Duration of Promo",
      width: 250,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "impactToOurProduct",
      headerName: "Impact to Our Product",
      width: 300,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customerFeedback",
      headerName: "Customer Feedback",
      width: 350,
      headerClassName: "bold-header",
      headerAlign: "center",
      align: "center",
    },
  ];

  async function getCompetitorsData() {
    try {
      const loggedInBranch = localStorage.getItem("accountNameBranchManning");

      console.log("Logged in branch:", loggedInBranch);

      if (!loggedInBranch) {
        console.error("No branch information found for the logged-in admin.");
        return;
      }

      const branches = loggedInBranch.split(",").map((branch) => branch.trim());

      console.log("Sending branches to API:", branches);

      const response = await axios.post(
        "https://rc-and-ugc.onrender.com/retrieve-competitor-data",
        { branches }
      );

      console.log("Raw API Response:", response.data);
      console.log("Filtered Data:", response.data.data);

      const data = response.data.data;

      if (!data || data.length === 0) {
        console.warn("No data received from API");
        setUserData([]);
        return;
      }

      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      const newData = sortedData.map((data, key) => ({
        id: key + 1, // Ensure each row has a unique `id` for DataGrid
        count: key + 1,
        date: data.date,
        inputId: data.inputId,
        userEmail: data.userEmail,
        merchandiserName: data.merchandiserName,
        outlet: data.outlet,
        store: data.store,
        company: data.company,
        brand: data.brand,
        promotionalType: data.promotionalType,
        promotionalTypeDetails: data.promotionalTypeDetails,
        displayLocation: data.displayLocation,
        pricing: data.pricing,
        durationOfPromo: data.durationOfPromo,
        impactToOurProduct: data.impactToOurProduct,
        customerFeedback: data.customerFeedback,
      }));

      console.log("Mapped Data:", newData);
      setUserData(newData);
    } catch (error) {
      console.error("Error fetching competitor data:", error);
    }
  }

  const fetchInventoryByDate = async () => {
    if (!dateBegin || !dateEnd) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const selectedDate = {
        startDate: dateBegin.format("YYYY-MM-DD"), // Format dates properly
        endDate: dateEnd.format("YYYY-MM-DD"),
      };

      console.log("Sending date range to backend:", selectedDate);

      await getDate(selectedDate); // Call the updated getDate function
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  async function getDate(selectedDate) {
    const data = {
      startDate: selectedDate.startDate,
      endDate: selectedDate.endDate,
    }; // Ensure the payload matches the backend expectation

    try {
      const response = await axios.post(
        "https://rc-and-ugc.onrender.com/filter-date-range", // Correct endpoint
        data
      );

      const parcels = response.data.data; // Access the data field
      console.log("Parcels fetched:", parcels);

      // Sort the data by date in descending order
      const sortedData = parcels.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      const newData = sortedData.map((data, key) => ({
        id: key + 1, // Ensure each row has a unique `id` for DataGrid
        count: key + 1,
        date: data.date,
        inputId: data.inputId,
        userEmail: data.userEmail,
        merchandiserName: data.merchandiserName,
        outlet: data.outlet,
        store: data.store,
        company: data.company,
        brand: data.brand,
        promotionalType: data.promotionalType,
        promotionalTypeDetails: data.promotionalTypeDetails,
        displayLocation: data.displayLocation,
        pricing: data.pricing,
        durationOfPromo: data.durationOfPromo,
        impactToOurProduct: data.impactToOurProduct,
        customerFeedback: data.customerFeedback,
      }));

      console.log("Mapped data:", newData);
      setUserData(newData); // Set data to render in the DataGrid
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  }

  React.useEffect(() => {
    getCompetitorsData();
  }, []);

  const getExportData = async () => {
    if (dateBegin === null || dateEnd === null) {
      return alert("Please fill date fields");
    }

    let bDate = dateBegin.$d.getTime();
    let eDate = dateEnd.$d.getTime();

    if (eDate - bDate <= 0) {
      return alert("End date must be ahead of or the same as the start date");
    }

    try {
      const response = await axios.post(
        "https://rc-and-ugc.onrender.com/export-competitors-data",
        {
          start: bDate,
          end: eDate,
        }
      );

      const headers = [
        "#",
        "Date",
        "Input ID",
        "Merchandiser Name",
        "Outlet",
        "Store",
        "Company",
        "Brand",
        "Promotional Type",
        "Promotional Type Details",
        "Display Location",
        "Pricing",
        "Duration of Promo",
        "Impact to Our Product",
        "Customer Feedback",
      ];

      const newData = response.data.data.map((data, key) => ({
        count: key + 1,
        date: data.date,
        inputId: data.inputId,
        merchandiserName: data.merchandiserName,
        outlet: data.outlet,
        store: data.store,
        company: data.company,
        brand: data.brand,
        promotionalType: data.promotionalType,
        promotionalTypeDetails: data.promotionalTypeDetails,
        displayLocation: data.displayLocation,
        pricing: data.pricing,
        durationOfPromo: data.durationOfPromo,
        impactToOurProduct: data.impactToOurProduct,
        customerFeedback: data.customerFeedback,
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);

      // Add headers and data
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
      XLSX.utils.sheet_add_json(ws, newData, {
        origin: "A2",
        skipHeader: true,
      });

      // Calculate dynamic column widths
      const colWidths = headers.map((header, index) => ({
        wch: Math.max(header.length, 15),
      }));
      ws["!cols"] = colWidths;

      headers.forEach((_, index) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
        if (!ws[cellAddress]) return;
        ws[cellAddress].s = {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "center" },
        };
      });

      XLSX.utils.book_append_sheet(wb, ws, "Competitors_Data");

      const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `COMPETITORS_DATA_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error exporting data. Please try again.");
    }
  };

  return (
    <div className="attendance">
      <Topbar />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            padding: { xs: "10px", sm: "20px" },
            maxWidth: "100%",
            overflow: "auto",
            backgroundColor: "#003554",
          }}
        >
          {/* Responsive Header with Controls */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ marginBottom: "20px" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                onChange={(newValue) => setDateBegin(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: false,
                    sx: { backgroundColor: "white" },
                  },
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                onChange={(newValue) => setDateEnd(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: false,
                    sx: { backgroundColor: "white" },
                  },
                }}
              />
            </LocalizationProvider>

            <Button
              onClick={getExportData}
              variant="contained"
              sx={{
                backgroundColor: "#0A21C0",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0A21C0",
                },
              }}
            >
              Export
            </Button>

            <Button
              onClick={fetchInventoryByDate}
              variant="contained"
              sx={{
                backgroundColor: "rgb(25, 118, 210)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(21, 101, 192)",
                },
              }}
            >
              Show Inventory
            </Button>
          </Stack>

          {/* Responsive DataGrid */}
          <Box
            sx={{
              height: "100%",
              width: "100%",
              maxHeight: "80vh",
              marginTop: 2,
              overflow: "hidden",
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
              },
            }}
          >
            <DataGrid
              rows={userData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: false },
                },
              }}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20, 30, 50, 100]}
              getRowId={(row) => row.count}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
