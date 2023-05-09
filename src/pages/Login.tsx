import React from 'react'
import styles from '@/styles/Home.module.css'
import  Button  from '@mui/material/Button'
import TextField from '@mui/material/TextField'
//import FormControlLabel from '@mui/material/FormControlLabel'
//import Checkbox from '@mui/material/Checkbox'
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
const loginSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  })
  .required();
  type FormData = yup.InferType<typeof loginSchema>;
function Login() {
    const {register,handleSubmit,formState:{errors}}=useForm<FormData>({ resolver: yupResolver(loginSchema)});
    const handleFormSubmit=(formData:any)=>{
     console.log('form data to check',formData)
    enqueueSnackbar('Login is Successfully',{
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
     Login
    </Typography>
  </Box>

  <SnackbarProvider
   anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }} />
  <Box component='form'className={styles.bg} onSubmit={handleSubmit(handleFormSubmit)}   noValidate sx={{mt:4}}>

<Paper>
<Grid container spacing={2}>
  <Grid item md={12} xs={12} sm={6}>
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
   autoComplete="password"
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


<Button type="submit" variant='contained' color='success'>Please Login</Button>
<Link href="./Signup" style={{marginLeft:"12px",color:'blue'}}>Go To Signup</Link>
  </Box>
</Container>
   </>
  )
}

export default Login