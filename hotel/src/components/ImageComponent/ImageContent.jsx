import React from 'react';
import './imageContext.css'
import { Button } from '@mui/material';

export const ImageContent = (props) => {
  return (
    <div className="image-area">
      <img src={typeof props.img==="string" ? props.img :URL.createObjectURL(props.img)} alt="Preview" style={{objectFit:"cover",width:"100%"}}/>
      <Button className="remove-image" onClick={(e)=>{
        e.stopPropagation();
        props.clickFunction();
      }} style={{ display: 'inline' }}>
        &#215;
      </Button>
    </div>
  );
};
