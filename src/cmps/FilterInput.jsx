import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function FilterInput({ handleChange, byName }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" label="Search " variant="outlined" onChange={handleChange} value={byName} name='byName' />
        </Box>
    );
}