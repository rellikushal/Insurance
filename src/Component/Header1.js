import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import p3 from '../images/p3.jpeg.jpg';
import '../App.css';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import { ClickAwayListener, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function Header1() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin");
  };

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div className='text-center'>
      <header>
        <div className="d-flex justify-content-between align-items-center py-2 rounded fixed" style={{ background: '#f0f8ff' }}>
         <Link to='/'><div>
             <img
              className="mx-3 ramana"
              src={p3}
              alt="RamanaSoft Insurance"
              title='RamanaSoft Insurance'
              style={{ borderRadius: '10px', cursor: 'pointer' }}
              onClick={handleClick}
            />
          </div></Link> 

          <div className="ms-auto me-3">
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="1800-143-123"
                >
                  <Link to="/1"> <button className='mx-5 mt-2  btn btn-link  text-decoration-none pnewpolicy'>Get new policy </button></Link>
                  <Button onClick={handleTooltipOpen} className='text-center me-4'>
                    Call Us &nbsp;<PhoneIcon />
                  </Button>
                </Tooltip>
                <Link to='/'><button type="button" className="btn btn-danger"> Log-out < LogoutIcon/></button></Link>
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header1;