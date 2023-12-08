import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { orderBy } from "lodash";

const AdminTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderByColumn, setOrderByColumn] = useState<string>("id");
  const [sampleData, setSampleData] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/data?page=${
          page + 1
        }&pageSize=${rowsPerPage}`
      );
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const result = await response.json();
      setTotalPages(result.totalPages);
      setSampleData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderByColumn === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderByColumn(property);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, totalPages * rowsPerPage - page * rowsPerPage);

  return (
    <div>
      <TableContainer component={Paper}>
        Search:
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton onClick={() => handleRequestSort("adminName")}>
                  Admin Name
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleRequestSort("role")}>
                  Role
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleRequestSort("email")}>
                  Email
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleRequestSort("createdAt")}>
                  CreatedAt
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.adminName}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
};

export default AdminTable;
