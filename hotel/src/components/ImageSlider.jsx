import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { IconButton } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

import StarBorderIcon from '@mui/icons-material/StarBorder';

const RootContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const ImageListContainer = styled(ImageList)({
  flexWrap: 'nowrap',
  transform: 'translateZ(0)',
});

const TitleBar = styled(ImageListItemBar)({
  background:
    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
});

const ImageSlider = ({ images }) => {
  return (
    <RootContainer>
      <ImageListContainer cols={1.5}>
        {images.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item} alt="hotelimg" />
            <TitleBar
              title=""
              sx={{
                '& .MuiImageListItemBar-title': {
                  color: 'primary.light',
                },
              }}
            />
          </ImageListItem>
        ))}
      </ImageListContainer>
    </RootContainer>
  );
};

export default ImageSlider;
