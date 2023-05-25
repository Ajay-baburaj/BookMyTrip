import { Grid} from "@mui/material";
import React from "react";

const ImageGallery = ({ images }) => {
    console.log(images)
  return (
    <Grid container spacing={1}>
      {images?.map((image,index) => (
        <Grid key={index} item spacing={2} sx={{width:'15rem',height:'15rem'}}>
          <img
            loading="lazy"
            src={image}
            style={{ width: "100%", height: "100%" ,objectFit:'cover'}}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGallery;
