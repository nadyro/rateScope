import {
    Box,
    Button,
    Fade,
    Grid,
    Grow,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import * as React from "react";
import {Operation} from "../../../models/operation.class";
import {CurrencyEnum} from "../../../models/currency.enum";
interface Props {
    arrayOperations: Operation[]
}
export const ConverterTable: React.FC<Props> =({arrayOperations}) =>  {
    return (
        <Fade in={arrayOperations.length > 0}
              {...({ timeout: 500 })}>
            <Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    Rate
                                </TableCell>

                                <TableCell>
                                    Fixed Rate
                                </TableCell>
                                <TableCell>
                                    Input Amount
                                </TableCell>

                                <TableCell>
                                    Input Currency
                                </TableCell>
                                <TableCell>
                                    Current Amount
                                </TableCell>

                                <TableCell>
                                    Current Currency
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arrayOperations.sort((a, b) => a.date < b.date ? 1 : -1).map((operation, index) => {
                                return <TableRow key={index}>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Typography sx={{color: 'black'}} variant={'body2'}>
                                            {index}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Typography sx={{color: 'black'}} variant={'body2'}>
                                            {operation.rate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Typography sx={{color: 'black'}} variant={'body2'}>
                                            {operation.fixed_rate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Typography sx={{color: 'black'}} variant={'body2'}>
                                            {operation.input_amount}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Typography sx={{color: 'black'}} variant={'body2'}>
                                            {operation.input_currency === CurrencyEnum.EUR ? 'Euro' : 'US Dollar(s)'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Typography sx={{color: 'black'}} variant={'body2'}>
                                            {operation.current_amount}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Typography sx={{color: 'black'}} variant={'body2'}>
                                            {operation.current_currency === CurrencyEnum.EUR ? 'Euro' : 'US Dollar(s)'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fade>
    )
}

