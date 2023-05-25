import { Typography,Box} from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';



function OrderSuccessfull() {

  return (
    <Box mt={3}>
    <Typography variant="h6" gutterBottom>
      Illustration in Sketch or AI
    </Typography>
    <Typography variant="body1" gutterBottom>
      Includes: Sketch, PSD, PNG, SVG, AI
    </Typography>
    <Typography variant="body2">
      Min: 1 illustration
    </Typography>
    <Box display="flex" flexDirection="column" mt={3}>
      <Typography variant="body2">
        <CheckIcon color="disabled" /> Vector file
      </Typography>
      <Typography variant="body2">
        <CheckIcon color="disabled" /> Source files
      </Typography>
    </Box>
  </Box>
  
  );
}

export default OrderSuccessfull;
