import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import p4 from '../../images/p4.jpeg';
import p3 from '../../images/p3.jpeg.jpg';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function AdminLoginCredentialsVI() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === "admin" && credentials.password === "admin@123") {
            navigate("/adminHomeVI");
        } else {
            alert("Invalid credentials");
        }
    };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    return (
        <div className='container-fluid adminLoginPage'>
            <div className='d-flex justify-content-center'>
                <img src={p3} className='rounded' style={{ height: '3rem', marginTop: '4rem' }} alt='Admin'/>
            </div>
            <div className='d-flex justify-content-center'>
                <form onSubmit={handleSubmit}>
                    <div className='card mt-3 p-4' style={{ width: '22rem' }}>
                        <h2 className='text-center mb-2 fw-bold'>
                            Admin Login <img src={p4} alt='logo' className='rounded ms-2' style={{ height: '35px' }} />
                        </h2>
                        <TextField 
                            id="standard-basic" 
                            label="User Name" 
                            variant="standard" 
                            name='username'
                            className=''
                            value={credentials.username}
                            onChange={onChange}
                            required
                        />
                        <div className="">
                            <FormControl
                                variant="standard"
                                className='w-100 mt-2'
                                >
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={credentials.password}
                                    onChange={onChange}
                                    required
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end" 
                                                style={{ marginRight: '-12px' }} 
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                        </div>
                        <button type='submit' className='btn btn-primary px-4 mt-4'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginCredentialsVI;