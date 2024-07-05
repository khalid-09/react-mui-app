import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'userId', headerName: 'User ID', width: 100 },
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'body', headerName: 'Body', width: 500 },
];

const SecondPage = () => {
  const user = localStorage.getItem('userDetails');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = (await res.json()) as Post[];
      setPosts(data);
    };
    fetchData();
    setLoading(false);
  }, [setLoading]);

  if (!user) {
    return (
      <Navigate
        to="/"
        state={{ message: 'Enter your details to visit next page.' }}
      />
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5 }}>
      <Typography
        sx={{ fontWeight: 700 }}
        variant="h5"
        component="h1"
        gutterBottom
      >
        Posts
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={posts} columns={columns} autoPageSize />
        </div>
      )}
    </Box>
  );
};

export default SecondPage;
