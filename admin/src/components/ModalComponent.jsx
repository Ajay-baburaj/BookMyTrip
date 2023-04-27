import React, { useEffect } from 'react'
import { Modal,Box } from '@mui/material'
import HotelDetail from './HotelDetail';

const ModalComponent = ({id,open, handleClose }) => {
    const style = {
        width: '80%',
        maxWidth: '1000px',
        maxHeight: '95vh',
        overflowY: 'auto',
        m: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
    
     return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: '80%', maxWidth: 'none' }}>
                   <HotelDetail id={id} />
                </Box>
            </Modal>
            {/* ------------------------------------------------------------ */}
    </>
  )
}

export default ModalComponent