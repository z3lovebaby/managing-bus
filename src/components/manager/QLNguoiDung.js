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

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
let users = [];
let manager = {
  name: "Nguyen H P",
  username: "phunh12345678",
  password: "12345679",
  email: "phu2401200@gmail.com",
  phone: "0987654321",
};
export default function QLNguoiDung() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [formErrors, setFormErrors] = useState({});
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
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteClick = (item) => {
    setSelectedItem(item); // Lưu item cần xóa
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    console.log("Deleted:", selectedItem);
    try {
      dispatch(actions.controlLoading(true));
      requestApi("/manager/delete-user", "POST", selectedItem).then((res) => {
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
      setSelectedManager(man);
      setNewData(man); // Load dữ liệu manager vào form
      console.log("true", newData);
    } else {
      // Nếu không có manager => Chế độ thêm mới
      console.log("create");
      setSelectedManager(null);
      setNewData({
        name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
      });
    }
  };
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  //fetch data
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      dispatch(actions.controlLoading(true));
      const response = await requestApi("/manager/get-all-user", "GET");
      console.log(response.data.data);
      users = response.data.data;
      setRows(response.data.data); // Giả sử API trả về một mảng users
      dispatch(actions.controlLoading(false));
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(actions.controlLoading(false));
      toast.error("Không thể tải dữ liệu", { position: "top-right" });
    }
  };
  const handleSearch = (event, value) => {
    if (!value) {
      setRows(users); // Reset khi không nhập gì
      return;
    }

    const searchTerm = value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.name.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm)
    );
    setRows(filtered);
  };
  const handleSelect = (event, value) => {
    if (value) {
      const { username, name, phone } = value; // Truy cập các biến riêng lẻ
      const filtered = users.filter(
        (user) =>
          user.username === username &&
          user.name === name &&
          user.phone === phone
      );
      console.log("val", filtered);
      setRows(filtered);
    } else {
      setRows(users); // Reset khi không chọn gì
    }
  };

  return (
    <div className="qluser">
      <Typography variant="h4" component="h2">
        Quản lý người dùng
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Autocomplete
          sx={{ width: 500, mb: 2 }}
          options={users}
          getOptionLabel={(option) =>
            `${option.username} (${option.name}) - ${option.phone}`
          }
          onInputChange={handleSearch}
          onChange={handleSelect} // Xử lý khi chọn
          renderInput={(params) => (
            <TextField {...params} label="Tìm người dùng" />
          )}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tên người dùng</StyledTableCell>
              <StyledTableCell align="left">EMail</StyledTableCell>
              <StyledTableCell align="right">Số điện thoại</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.username}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phone}</StyledTableCell>
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
            Chi tiết người dùng
          </Typography>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Tên người dùng"
                name="name"
                value={newData.name}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={newData.username}
                onChange={handleInputChange}
              />
              {formErrors.username && (
                <p style={{ color: "red" }}>{formErrors.username}</p>
              )}
            </Grid2>
            {/* <Grid2 item xs={12}>
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
            </Grid2> */}
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
                label="Số điện thoại"
                name="phone"
                value={newData.phone}
                onChange={handleInputChange}
              />
              {formErrors.phone && (
                <p style={{ color: "red" }}>{formErrors.phone}</p>
              )}
            </Grid2>
          </Grid2>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
