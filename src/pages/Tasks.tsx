import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchTasksByElder, addTask, updateTask, deleteTask } from '../services/tasks';
import type { Task } from '../types';
import {
  Box,
  Button,
  Breadcrumbs,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
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
import { Add, Edit, Delete, ArrowBack, Home } from '@mui/icons-material';

export default function Tasks() {
  const { elderId } = useParams<{ elderId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const elderName = location.state?.elderName || 'Elder';
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    task_name: '',
    task_category_id: 1,
    instructions: '',
    rrule: '',
  });

  useEffect(() => {
    if (elderId) {
      loadTasks();
    }
  }, [elderId]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasksByElder(Number(elderId));
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await updateTask(editing, formData);
      } else {
        await addTask({
          ...formData,
          elder_id: Number(elderId),
          active: true,
          created_by: 1,
          updated_by: 1,
        });
      }
      await loadTasks();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setFormData({
      task_name: task.task_name,
      task_category_id: task.task_category_id,
      instructions: task.instructions || '',
      rrule: task.rrule || '',
    });
    setEditing(task.id);
    setShowDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        await loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleCloseDialog = () => {
    setFormData({
      task_name: '',
      task_category_id: 1,
      instructions: '',
      rrule: '',
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
      <Box mb={3}>
        <Breadcrumbs>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/elders')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            underline="hover"
          >
            <Home sx={{ mr: 0.5 }} fontSize="small" />
            Elders
          </Link>
          <Typography color="text.primary">Tasks for {elderName}</Typography>
        </Breadcrumbs>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/elders')}
            variant="outlined"
          >
            Back to Elders
          </Button>
          <Typography variant="h4" component="h1">
            Tasks for {elderName}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowDialog(true)}
        >
          Add Task
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Instructions</TableCell>
              <TableCell>Schedule (RRULE)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    No tasks yet. Click "Add Task" to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.task_name}</TableCell>
                  <TableCell>Category {task.task_category_id}</TableCell>
                  <TableCell>{task.instructions || '-'}</TableCell>
                  <TableCell>
                    <code style={{ fontSize: '0.85em' }}>{task.rrule || '-'}</code>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.active ? 'Active' : 'Inactive'}
                      color={task.active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(task)} color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(task.id)} color="error">
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

      <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? 'Edit Task' : 'New Task'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Task Name"
              required
              value={formData.task_name}
              onChange={(e) => setFormData({ ...formData, task_name: e.target.value })}
            />
            <TextField
              fullWidth
              select
              label="Category"
              required
              value={formData.task_category_id}
              onChange={(e) => setFormData({ ...formData, task_category_id: Number(e.target.value) })}
            >
              <MenuItem value={1}>Medication</MenuItem>
              <MenuItem value={2}>Appointment</MenuItem>
              <MenuItem value={3}>Exercise</MenuItem>
              <MenuItem value={4}>Meal</MenuItem>
              <MenuItem value={5}>Other</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Instructions"
              multiline
              rows={3}
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Additional details or instructions for this task..."
            />
            <TextField
              fullWidth
              label="RRULE Schedule"
              value={formData.rrule}
              onChange={(e) => setFormData({ ...formData, rrule: e.target.value })}
              placeholder="e.g., FREQ=DAILY;BYHOUR=9;BYMINUTE=0"
              helperText="Enter recurring rule for scheduling (RRULE format)"
            />
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