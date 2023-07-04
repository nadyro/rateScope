import {Box, Grid, Typography} from "@mui/material";
import * as React from "react";
import {CurrencyEnum} from "../../../models/currency.enum";
import {AttachMoney, CompareArrows, Euro} from "@mui/icons-material";
interface Props {
    inputCurrency: CurrencyEnum,
    currentCurrency: CurrencyEnum,
    changeCurrency: () => void,
    rate: number
}
const changeCurrencyIconStyle = {
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0 0 1px rgba(0,0,0, 0.5)',
    }
}
export const Currency: React.FC<Props> =({inputCurrency, currentCurrency, changeCurrency, rate}) =>  {
    return (
        <Grid container spacing={3} sx={{height: 'inherit'}}>
            <Grid item xs={12}>
                <Box sx={{display: 'inline-block'}}>
                    {inputCurrency === CurrencyEnum.EUR ? <Euro color={'warning'}/> : <AttachMoney color={'success'}/>}
                </Box>
                <Box sx={{display: 'inline-block', padding: '10px', cursor: 'pointer'}} onClick={changeCurrency} >
                    <CompareArrows sx={changeCurrencyIconStyle} color={'primary'}/>
                </Box>
                <Box sx={{display: 'inline-block'}}>
                    {currentCurrency === CurrencyEnum.EUR ? <Euro color={'warning'}/> : <AttachMoney color={'success'}/>}
                </Box>
                <Typography variant={'body2'} color={'black'}>Current exchange rate : {rate}</Typography>

            </Grid>
            <Grid item xs={12}>
                <Box>
                </Box>
            </Grid>
        </Grid>
    )
}

