import React from 'react';
import { Grid, Button } from '@mui/material';

const FullWidthButton = ({ text, variant, color }) => {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Button fullWidth variant={variant} color={color}>
                    {text}
                </Button>
            </Grid>
        </Grid>
    );
};

export default FullWidthButton;
