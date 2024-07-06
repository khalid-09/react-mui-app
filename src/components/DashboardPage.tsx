import { Box } from '@mui/material';
import Posts from './Posts';
import DepartmentList from './DepartmentList';

const DashboardPage = () => {
  return (
    <div>
      <Posts />
      <Box sx={{ maxWidth: 300, mx: 'auto', my: 5 }}>
        <DepartmentList />
      </Box>
    </div>
  );
};

export default DashboardPage;
