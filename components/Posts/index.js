import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidthContext } from '../contexts/windowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const { isSmallerDevice } = useWindowWidthContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startNumber, setStartNumber] = useState(0);
  const [isMorePostAvailable, setIsMorePostAvailable] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      setPosts(posts);
    };

    fetchPost();
  }, [isSmallerDevice]);

  useEffect(() => {
    if (posts.length === 100) {
      setIsMorePostAvailable(false);
    }
  }, [posts]);

  const handleClick = async () => {
    setIsLoading(true);

    const { data: newPosts } = await axios.get('/api/v1/posts', {
      params: {
        start: isSmallerDevice ? startNumber + 5 : startNumber + 10,
        limit: isSmallerDevice ? 5 : 10,
      },
    });

    setPosts(prev => [...prev, ...newPosts]);
    setStartNumber(prev => (isSmallerDevice ? prev + 5 : prev + 10));
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </PostListContainer>

      {isMorePostAvailable && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
