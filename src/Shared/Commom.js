import { bglightgray } from "./color";

export const flexcenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const flexbetween = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between;',
};

export const flexcoloumcenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};



export const flexcenterstart = {
  display: 'flex',
  alignItems: 'center',
};

export const normalinput = {
  borderRadius: '10px',

  '&>div': {
    border: 'none',
    borderRadius: '10px',
    color: 'black',
    fontSize: '13px',
    fontWeight: '500',
  },
  '&>div': {
    border: 'none',
    borderRadius: '10px',
    color: 'black',
    fontSize: '13px',
    fontWeight: '500',
  },
  '&>div>input': {
    padding: '12px !important',
    borderRadius: '10px',
    border: ' 1px solid #F7F8FF',
    background: '#FFFFFF',
  },
  '& input::placeholder': {
    color: '#757575',
    opacity: 1,
    fontSize: '15px',
    fontWeight: '400',
  },
  '&>div>input:focus-within': {
    border: ' 1px solid #e0e0e0',
  },
  '&>div>fieldset': {
    border: 'none !important',
    borderRadius: '10px',
    marginLeft: '20px',
  },

}

export const selectinput = {
  width: '18%',
  borderRadius: '10px',

  border: 'none !important',
  '&>div': {
    border: 'none',
    borderRadius: '10px',
    color: 'black',
    padding: '12px 0px 12px 5px !important',
    border: 'none !important',
  },
  '&>div>fieldset': {
    border: 'none !important',
    borderRadius: '10px',
    marginLeft: '20px',
    border: 'none',
  },

}


export const passwordinput = {
  borderRadius: '10px',
  background: '#FFFFFF',
  '&>input': { padding: '12px', color: 'black', background: '#FFFFFF', borderRadius: '10px', },
  '&>div>button': { padding: '0px', },
  '&>:hover': {
    borderRadius: '10px 0px 0px 10px'
  },
  '&>fieldset': { border: ' 1px solid #F7F8FF', },
  '&>input::placeholder': {
    color: '#757575',
    opacity: 1,
    fontSize: '15px !important',
    fontWeight: '400 !important',
  },
  '&>fieldset:focus-visible': {
    border: ' 1px solid #e0e0e0 !important',
  },
  '& .MuiOutlinedInput-root': {
    border: ' 1px solid #F7F8FF',
    '& fieldset': {
      border: ' 1px solid #F7F8FF',
    },
  }
}
