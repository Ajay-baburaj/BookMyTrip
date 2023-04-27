import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import { LocationOn, Phone, RoomService } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { deleteHotelUrl, getDataUrl } from '../utils/apiRoutesHotel';
import axios from 'axios'
import { useEffect } from 'react';
import MuiImageSlider from 'mui-image-slider';
import ImageSlider from '../components/ImageSlider';


const useStyles = makeStyles((theme) => ({

  root: {
    maxWidth: 600,
    margin: '0 auto',
    marginTop: theme.spacing(4),
    paddingBottom: "20px"

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  rating: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const HotelProfile = () => {
  const [cookies, removeCookie, setCookie] = useCookies(['jwt'])
  const [token, setToken] = useState(cookies?.jwt)
  const [data,setData] = useState({})
  const classes = useStyles();
  const navigate = useNavigate();
  const hotel = useSelector(state => state.hotel.hotel)

 
  const handleDelete = async (id) => {
  const confirmed = window.confirm("delete ? data cannot be retrieved ?");
  if(confirmed){
    await axios.delete(`${deleteHotelUrl}/${id}`, {
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      navigate("/hotel/register")
    })

    }
  }



  useEffect(() => {
    fetchHotel()
  }, [])


    const fetchHotel = async () => {
    const response = await axios.get(getDataUrl + `/${hotel?.email}`, {
      headers: {
        withCredentials: true,
        'Authorization': `Bearer ${token}`
      }
    })
    setData(response?.data?.hotelData)

  }

  console.log(data)

  return (
    <Box sx={{ backgroundColor: "#F0F0F0", backgroundSize: "cover", padding: "50px" }}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="hotel">
              {/* {data ? data?.name[0]: ""} */}
            </Avatar>
          }
          title={
            <Typography
              variant="h5"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 500,
                letterSpacing: '0.02rem',
              }}
            >
              {data.name}
            </Typography>
          }
          subheader={data.city}
        />
        <Box sx={{ display: "flex", justifyContent: "center", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;", padding: "20px", marginBottom: "20px"
            ,maxWidth:'400x' }}>
          {
            data.hotelImage &&
            <ImageSlider images={data.hotelImage} />
            
          }
        </Box>
        <CardContent>
          <Typography sx={{ fontSize: "14px", fontWeight: "500", marginBottom: "25px" }}>
            {
              data?.description?.length > 400 ? data?.description.substring(0,400) : data?.description
            }
          </Typography>
          <Box sx={{ marginTop: "1.5rem" }}>
            <Typography variant="body2" color="textSecondary" component="p">
              <LocationOn className={classes.icon} />{`${data.street},${data.landmark},${data.city}`}<br />
              <Phone className={classes.icon} />{data.phone}<br />
            </Typography>
          </Box>

        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => navigate("/hotel/info")} variant='contained'>
            Edit
          </Button>
          <Button size="small" color="danger" variant='contained' onClick={() => handleDelete(hotel._id)}
          >
            Delete
          </Button>
          <Box flexGrow={1} />
          <IconButton aria-label="add to favorites">
          </IconButton>
          <IconButton aria-label="share">
          </IconButton>
        </CardActions>
      </Card>
    </Box>

  );
};

export default HotelProfile;
