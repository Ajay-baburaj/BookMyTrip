import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFectch';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';





function Featured() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, loading, error } = useFetch(
    'https://api.bookmytrip.site/api/countByCity?cities=kochi,munnar,alleppy,banglore'
  );



  const handleClick = (obj) => {
    const destination = obj?.destination
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1)
    console.log(currentDate);
    console.log(nextDay)

    const date = [{ startDate: currentDate, endDate: nextDay, key: 'selection' }]
    const options = { adult: 1, children: 0, room: 1 }
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, date, options }
    })


    navigate('/hotels', { state: { destination, date, options } })
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, sm: 2, md: 4 }} sx={{display:'flex',justifyContent:'center'}}>
        <Grid item xs={6} sm={6} md={2}>
          <Card>
            <CardActionArea onClick={() => handleClick({ destination: "munnar" })}>
              <img src="https://r-xx.bstatic.com/xdata/images/city/250x250/684720.jpg?k=fdb1d9397eeb9b17d4a1ef6fdf806e6b4366d5ebda38d7f0c212b9c1bec8dcea&o=" alt="" className="featuredImg" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">Munnar</Typography>
                <Typography variant="subtitle1">{data[1]} properties</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <Card>
            <CardActionArea onClick={() => handleClick({ destination: "kochi" })}>
              <img src="https://q-xx.bstatic.com/xdata/images/city/250x250/684572.jpg?k=f74af2be72834d9953c8096834db666c7769c5f6c1ba230d6fe5591ba84dd33d&o=" alt="" className="featuredImg" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">Kochi</Typography>
                <Typography variant="subtitle1">{data[0]} properties</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <Card>
            <CardActionArea onClick={() => handleClick({ destination: "banglore" })}>
              <img src="https://q-xx.bstatic.com/xdata/images/city/250x250/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="" className="featuredImg" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">Banglore</Typography>
                <Typography variant="subtitle1">{data[3]} properties</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
          <Card>
            <CardActionArea onClick={() => handleClick({ destination: "alleppy" })}>
              <img src="https://q-xx.bstatic.com/xdata/images/city/250x250/684514.jpg?k=94a24874ade1e734dd61fa72b85a246a86a682b1e6e8a0e257cf82ad151ed1f0&o=" alt="" className="featuredImg" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">Alleppy</Typography>
                <Typography variant="subtitle1">{data[2]} properties</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}

export default Featured