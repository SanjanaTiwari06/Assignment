"use client";
import { useEffect, useState } from "react";
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Box } from "@mui/material";
import { useUserStore } from "@/store/userStore";
import Protected from "@/components/Protected";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter(); 
  const { users, total, fetchUsers, searchUsers, loading } = useUserStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // API se users fetch karna
    fetchUsers(rowsPerPage, page * rowsPerPage);
  }, [page, rowsPerPage, fetchUsers]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    searchUsers(query); 
  };

  return (
    <Protected>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Users Directory
        </Typography>

        <TextField 
          fullWidth 
          label="Search users by name..." 
          variant="outlined" 
          value={search} 
          onChange={handleSearch} 
          sx={{ mb: 3, backgroundColor: 'white' }} 
        />

        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                
                  onClick={() => router.push(`/dashboard/user/${user.id}`)} 
                  sx={{ 
                    cursor: 'pointer', 
                    '&:hover': { backgroundColor: '#f0f7ff !important' } 
                  }}
                >
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{user.gender}</TableCell>
                  <TableCell>{user.company?.name || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <TablePagination
            component="div"
            count={total || 0}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
      </Container>
    </Protected>
  );
}