import { useEffect, useState } from 'react';
import { fetchElders, addElder, updateElder, deleteElder } from '../services/elders';
import type { Elder } from '../types';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Add, Edit, Delete, Assignment } from '@mui/icons-material';

export default function Elders() {
  const [elders, setElders] = useState<Elder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    timezone: 'America/New_York'
  });

  useEffect(() => {
    loadElders();
  }, []);

  const loadElders = async () => {
    setLoading(true);
    try {
      const data = await fetchElders();
      setElders(data);
    } catch (error) {
      console.error('Error loading elders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await updateElder(editing, formData);
      } else {
        await addElder(formData);
      }
      await loadElders();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving elder:', error);
    }
  };

  const handleEdit = (elder: Elder) => {
    setFormData({
      name: elder.name,
      phone: elder.phone,
      timezone: elder.timezone
    });
    setEditing(elder.id);
    setShowDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this elder?')) {
      try {
        await deleteElder(id);
        await loadElders();
      } catch (error) {
        console.error('Error deleting elder:', error);
      }
    }
  };

  const handleCloseDialog = () => {
    setFormData({
      name: '',
      phone: '',
      timezone: 'America/New_York'
    });
    setEditing(null);
    setShowDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Elders
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowDialog(true)}
        >
          Add Elder
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Timezone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    No elders yet. Click "Add Elder" to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              elders.map((elder) => (
                <TableRow key={elder.id}>
                  <TableCell>{elder.name}</TableCell>
                  <TableCell>{elder.phone}</TableCell>
                  <TableCell>{elder.timezone}</TableCell>
                  <TableCell>
                    <Chip
                      label={elder.active ? 'Active' : 'Inactive'}
                      color={elder.active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Manage Tasks">
                      <IconButton 
                        onClick={() => navigate(`/elders/${elder.id}/tasks`, { state: { elderName: elder.name } })} 
                        color="info"
                      >
                        <Assignment />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(elder)} color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(elder.id)} color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Elder' : 'New Elder'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Phone"
              type="tel"
              required
              placeholder="+1234567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextField
              fullWidth
              select
              label="Timezone"
              required
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            >
              <MenuItem value="America/New_York">Eastern Time</MenuItem>
              <MenuItem value="America/Chicago">Central Time</MenuItem>
              <MenuItem value="America/Denver">Mountain Time</MenuItem>
              <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
              <MenuItem value="America/Anchorage">Alaska Time</MenuItem>
              <MenuItem value="Pacific/Honolulu">Hawaii Time</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}