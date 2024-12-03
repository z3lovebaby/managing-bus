import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid2 from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../common/confirmDeleteModal";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 123, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
let drivers = [];
let manager = {
  name: "Nguyen H P",
  username: "phunh12345678",
  password: "12345679",
  email: "phu2401200@gmail.com",
  phone: "0987654321",
  blx: "123-456-789",
  bus_id: "123",
};
const buses = [
  { id: 1, name: "Bus A", code: "A123" },
  { id: 2, name: "Bus B", code: "B456" },
  { id: 3, name: "Bus C", code: "C789" },
];
export default function QLTaiXe() {
  const [rows, setRows] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false); // Xác định modal đang ở chế độ edit hay thêm mới
  const [selectedManager, setSelectedManager] = useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newData, setNewData] = React.useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    blx: "",
    bus_id: "",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteClick = (item) => {
    setSelectedItem(item); // Lưu item cần xóa
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted:", selectedItem);
    try {
      dispatch(actions.controlLoading(true));
      requestApi("/manager/delete-driver", "POST", selectedItem).then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        fetchData();
        dispatch(actions.controlLoading(false));
      });
    } catch (error) {
      dispatch(actions.controlLoading(false));
      console.log(error);
      if (typeof error.response !== "undefined") {
        if (error.response.status !== 201) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Server is down. Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
    setDeleteModalOpen(false);
  };

  const handleOpen = (man = null) => {
    setOpen(true);
    console.log(man);
    if (man) {
      // Nếu có manager truyền vào => Chế độ cập nhật
      console.log("update");
      setIsEditMode(true);
      setSelectedManager(man);
      setNewData(man); // Load dữ liệu manager vào form
      console.log("true", newData);
    } else {
      // Nếu không có manager => Chế độ thêm mới
      console.log("create");
      setIsEditMode(false);
      setSelectedManager(null);
      setNewData({
        name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        blx: "",
        bus_id: "",
      });
    }
    setIsSubmitted(false);
  };
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [isSubmitted, newData]);
  //fetch data
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      dispatch(actions.controlLoading(true));
      const response = await requestApi("/manager/get-all-driver", "GET");
      console.log(response.data);
      drivers = response.data;
      setRows(response.data); // Giả sử API trả về một mảng drivers
      dispatch(actions.controlLoading(false));
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(actions.controlLoading(false));
      toast.error("Không thể tải dữ liệu", { position: "top-right" });
    }
  };
  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (newData.email === "" || newData.email === undefined) {
      errors.email = "Hãy nhập email";
    } else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        newData.email
      );
      if (!valid) {
        errors.email = "Email không hợp lệ";
      }
    }
    const phonePattern = /^[0-9]{10,11}$/;
    if (!newData.phone) {
      errors.phone = "Hãy nhập số điện thoại";
    } else if (!phonePattern.test(newData.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }
    if (!isEditMode && newData.username?.length < 8) {
      errors.username = "Username tối thiểu 8 kí tự";
    }
    if (
      !isEditMode &&
      (newData.password === "" || newData.password === undefined)
    ) {
      errors.password = "Hãy nhập mật khẩu";
    }
    if (!isEditMode && (newData.blx === "" || newData.blx === undefined)) {
      errors.blx = "Hãy nhập số bằng lái xe";
    }
    if (newData.bus_id === "" || newData.bus_id === undefined) {
      errors.bus = "Chọn xe cho tài xế";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      isValid = false;
    } else {
      setFormErrors({});
    }

    return isValid;
  };

  const handleSubmit = () => {
    console.log("TT Tài xế:", newData);
    let valid = validateForm();
    console.log(formErrors, valid);
    if (valid) {
      if (isEditMode) {
        // Xử lý cập nhật
        console.log("Updating tài xe:", newData);
        console.log("request update tx");
        dispatch(actions.controlLoading(true));
        requestApi("/manager/update-driver", "POST", newData)
          .then((res) => {
            console.log(res);
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 3000,
            });
            fetchData();
            dispatch(actions.controlLoading(false));
            setIsSubmitted(false);
            setFormErrors({});
            handleClose();
            return;
          })
          .catch((err) => {
            dispatch(actions.controlLoading(false));
            console.log(err);
            if (typeof err.response !== "undefined") {
              if (err.response.status !== 201) {
                toast.error(err.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            } else {
              toast.error("Server is down. Please try again!", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          });
      } else {
        //xu ly them moi
        console.log("request thêm mới tài xế api");
        dispatch(actions.controlLoading(true));
        requestApi("/manager/create-driver", "POST", newData)
          .then((res) => {
            console.log(res);
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 3000,
            });
            fetchData();
            dispatch(actions.controlLoading(false));
            setIsSubmitted(false);
            setFormErrors({});
            handleClose();
            return;
          })
          .catch((err) => {
            dispatch(actions.controlLoading(false));
            console.log(err);
            if (typeof err.response !== "undefined") {
              if (err.response.status !== 201) {
                toast.error(err.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            } else {
              toast.error("Server is down. Please try again!", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          });
      }
    }
    setIsSubmitted(true);
  };
  const handleSearch = (event, value) => {
    if (!value) {
      setRows(drivers); // Reset khi không nhập gì
      return;
    }

    const searchTerm = value.toLowerCase();
    const filtered = drivers.filter(
      (driver) =>
        driver.username.toLowerCase().includes(searchTerm) ||
        driver.name.toLowerCase().includes(searchTerm) ||
        driver.phone.includes(searchTerm)
    );
    setRows(filtered);
  };
  const handleSelect = (event, value) => {
    if (value) {
      const { username, name, phone } = value; // Truy cập các biến riêng lẻ
      const filtered = drivers.filter(
        (user) =>
          user.username === username &&
          user.name === name &&
          user.phone === phone
      );
      console.log("val", filtered);
      setRows(filtered);
    } else {
      setRows(drivers); // Reset khi không chọn gì
    }
  };
  return (
    <div className="qldriver">
      <Typography variant="h4" component="h2">
        Quản lý tài xế
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => handleOpen()}
        >
          Đăng kí mới tài xế
        </Button>
        <Autocomplete
          sx={{ width: 500 }}
          options={drivers}
          getOptionLabel={(option) =>
            `${option.username} (${option.name}) - ${option.phone}`
          }
          onInputChange={handleSearch}
          onChange={handleSelect} // Xử lý khi chọn
          renderInput={(params) => (
            <TextField {...params} label="Tra cứu tài xế" />
          )}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Full name</StyledTableCell>
              <StyledTableCell align="left">Mail</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Bằng lái xe</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                <StyledTableCell align="left">{row.blx}</StyledTableCell>
                <StyledTableCell align="center">
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleOpen(row)}
                    >
                      View
                    </Button>
                    {/* Danh sách */}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(row)}
                    >
                      Delete
                    </Button>

                    {/* Modal delete */}
                    <ConfirmDeleteModal
                      open={deleteModalOpen}
                      onClose={() => setDeleteModalOpen(false)}
                      onConfirm={handleConfirmDelete}
                      message={`Bạn có chắc chắn muốn xóa ${selectedItem?.name}?`}
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditMode ? "Cập nhật thông tin tài xế" : "Thêm mới tài xế"}
          </Typography>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={newData.name}
                disabled={isEditMode}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={newData.username}
                disabled={isEditMode}
                onChange={handleInputChange}
              />
              {formErrors.username && (
                <p style={{ color: "red" }}>{formErrors.username}</p>
              )}
            </Grid2>
            {!isEditMode && (
              <Grid2 item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={newData.password}
                  onChange={handleInputChange}
                />
                {formErrors.password && (
                  <p style={{ color: "red" }}>{formErrors.password}</p>
                )}
              </Grid2>
            )}
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Mail"
                name="email"
                value={newData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p style={{ color: "red" }}>{formErrors.email}</p>
              )}
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={newData.phone}
                onChange={handleInputChange}
              />
              {formErrors.phone && (
                <p style={{ color: "red" }}>{formErrors.phone}</p>
              )}
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Bằng lái xe"
                name="blx"
                value={newData.blx}
                disabled={isEditMode}
                onChange={handleInputChange}
              />
              {formErrors.blx && (
                <p style={{ color: "red" }}>{formErrors.blx}</p>
              )}
            </Grid2>
            <Grid2 item xs={12}>
              <Autocomplete
                sx={{ width: 550 }}
                options={buses} // Assuming buses is an array of objects containing bus information
                getOptionLabel={(option) => `${option.name} (${option.code})`} // Displaying name and code
                onChange={(event, value) => {
                  // Update the newData with the selected bus's ID
                  handleInputChange({
                    target: {
                      name: "bus_id", // The name of the field you want to store the bus ID in
                      value: value ? value.id : "", // Store the ID, or set it to an empty string if no selection
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn xe" />
                )}
                value={buses.find((bus) => bus.id === newData.bus_id) || null} // To ensure the selected bus is displayed
              />
              {formErrors.blx && (
                <p style={{ color: "red" }}>{formErrors.blx}</p>
              )}
            </Grid2>
          </Grid2>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              {isEditMode ? "Update" : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
