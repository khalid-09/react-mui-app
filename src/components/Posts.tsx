import { Alert, Box, CircularProgress, Typography } from '@mui/material';
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

const Posts = () => {
  const user = localStorage.getItem('userDetails');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = (await res.json()) as Post[];
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!user) {
    return (
      <Navigate
        to="/"
        state={{ message: 'Enter your details to visit next page.' }}
      />
    );
  }

  if (error) {
    return (
      <Alert sx={{ maxWidth: 300, mx: 'auto', my: 5 }} severity="error">
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', my: 5 }}>
      <Typography
        sx={{ fontWeight: 700 }}
        variant="h5"
        component="h1"
        gutterBottom
      >
        Posts
      </Typography>
      <div className="w-full h-96 items-center flex justify-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid rows={posts} columns={columns} autoPageSize />
        )}
      </div>
    </Box>
  );
};

export default Posts;
