import React from 'react'
import styles from '@/styles/Home.module.css'
import  Button  from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import Link from 'next/link'
import { Paper } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const SignupSchema = yup
  .object({
    fullName: yup.string().required().label("Full Name"),
    email: yup.string().required("Email is required"),
    phone: yup

      .number()
      .label("Phone Number ")
      .required()
      .positive()
      .integer()
      .min(10, "Phone number must be minimum 10 characters long"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  })
  .required();
  type FormData = yup.InferType<typeof SignupSchema>;
function Signup() {
  const {register,handleSubmit,formState:{errors}}=useForm<FormData>({ resolver: yupResolver(SignupSchema)});
  const handleFormSubmit=(formData:any)=>{
   //console.log('form data to check',formData)
   enqueueSnackbar('Signup is Successfully',{
    autoHideDuration:4000,
    variant:"success"
  })
  }
  return (
   <>
<Container component="main" maxWidth="xs">
  <Box
  sx={{
    marginTop:8,
    display:'flex',
    flexDirection:'column',
    alignItems:"center",
    
  }}
  >
    <Typography component="h1" variant='h5'>
     Sign Up
    </Typography>
  </Box>

  <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          />
  <Box component='form' className={styles.bg} onSubmit={handleSubmit(handleFormSubmit)}  noValidate 
   sx={{
    // mt:4,
    // marginLeft:"460px"
    }}>
      <Paper>
      <Grid  container spacing={2}>
  <Grid item md={12} xs={12} sm={6}>
   <TextField
   autoComplete="given-name"
   required fullWidth
   id="fullName"
   label='Full Name'
 
   {...register('fullName')}
   />
   <p className={styles.error}>{errors.fullName?.message}</p>
  </Grid>
</Grid>
<br/>

<Grid  container spacing={2}>
  <Grid  item md={12} xs={12} sm={6}>
   <TextField
   autoComplete="email"
   {...register('email')}
   required fullWidth
   id="email"
   label='Email'
   />
   
   <p className={styles.error}>{errors.email?.message}</p>
  </Grid>
</Grid>
<br/>

<Grid container spacing={2}>
  <Grid item md={12} xs={12} sm={6}>
   <TextField
   autoComplete="phone"
   {...register('phone')}
   required fullWidth
   id="phone"
   label='Phone Number'
   error={Boolean(errors?.phone?.message)}
   helperText={errors.phone?.message}
   />
   {/* <p className={styles.error}>{errors.phone?.message}</p> */}
  </Grid>
</Grid>
<br/>


<Grid container spacing={2}>
  <Grid item md={12} xs={12} sm={6}>
   <TextField
   autoComplete="new-password"
   {...register('password')}
   required fullWidth
   id="password"
   label='Password'
   />
   <p className={styles.error}>{errors.password?.message}</p>
  </Grid>
</Grid>
<br/>
      </Paper>

      <br/>



<Button type="submit" 
 variant='contained' color='success'>Please Signup</Button>

<Link href="./Login" style={{marginLeft:"12px",color:"blue"}}>Go To Login</Link>
  </Box>
</Container>
   </>
  )
}

export default Signup