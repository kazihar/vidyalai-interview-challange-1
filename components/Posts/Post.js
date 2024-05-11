import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const AuthorDetailsContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
  padding: '10px',
}));

const AuthorProfilePhoto = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  backgroundColor: '#808080',
  '& > p': {
    color: '#ffffff',
    fontWeight: 'bolder',
    fontSize: 'larger',
  },
}));

const AuthorDetails = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
  '& > .username': {
    fontSize: 'larger',
    fontWeight: 'bolder',
  },
  '& > .email': {
    fontSize: 'medium',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
  bottom: 140px;
`;

const NextButton = styled(Button)`
  right: 10px;
  bottom: 140px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const getAuthorProfilePhotoContent = name => {
    const splittedName = name.split(' ');
    if (splittedName.length > 1) {
      return `${splittedName[0][0].toUpperCase()}${splittedName[1][0].toUpperCase()}`;
    } else if (splittedName.length == 1) {
      return `${splittedName[0][0].toUpperCase()}${splittedName[0][1].toUpperCase()}`;
    }
  };

  return (
    <PostContainer>
      <AuthorDetailsContainer>
        <AuthorProfilePhoto>
          <p>{getAuthorProfilePhotoContent(post.userName)}</p>
        </AuthorProfilePhoto>
        <AuthorDetails>
          <p className="username">{post.userName}</p>
          <p className="email">{post.userEmail}</p>
        </AuthorDetails>
      </AuthorDetailsContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
