import { Container, Grid, Skeleton } from '@mui/material'
import React from 'react'

export const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton animation='wave' variant="rectangular" width={'100%'} height={130.19} />
      <Container maxWidth='lg'>
        <Grid container spacing={2} marginTop={5} sx={{display:'flex', flexDirection:'column',alignItems:'center'}}>
          {[...Array(5)]?.map((item, index) =>
            <Grid key={index} item xs={12} md={4} >
              <Skeleton animation='wave' variant="rectangular" width={650} height={250.33} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  )
}
