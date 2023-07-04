import {Button, Fade, Grid, Grow, Typography} from "@mui/material";
import * as React from "react";
export const bannerStyle = {
    transform: 'translateY(-50%) !important',
    top: '50% !important',
    position: 'absolute'
}
export const btnStyle = {

    backgroundColor: 'transparent',
    padding: '16px',
    textShadow: '0 0 1px black',
    fontSize: '18px',
    fontWeight: '700',
    textTransform: 'math-auto',
    '&:hover': {
        backgroundColor: 'transparent',
    }
}

interface Props {
    handleBtnClick: () => void
}
export const Introduction: React.FC<Props> =({handleBtnClick}) =>  {
    return (
        <Grid container spacing={3} sx={{height: 'inherit'}}>
            <Grid item  sx={bannerStyle} xs={12}>
                <Fade in={true}
                      {...({ timeout: 2000 })}
                >
                    <Typography variant={'h5'} sx={{fontWeight: '700', fontSize: '48px'}}>Have you ever wondered how to optimize your currency exhange ?</Typography>
                </Fade>
                <Fade
                    in={true}
                    {...({ timeout: 3000 })}
                >
                    <Typography variant={'body2'}>Try out our real-time convertion tool in order to always stay updated on the exhange rate ! </Typography>
                </Fade>

                <Grid item style={{textAlign: 'center', marginTop: '32px'}}>
                    <Fade in={true}
                          {...({ timeout: 3000 })}
                    >
                        <Button variant={"contained"} onClick={handleBtnClick} sx={btnStyle}>Try it out</Button>

                    </Fade>
                </Grid>
            </Grid>
        </Grid>
    )
}

