import * as React from "react";
import {useCallback, useState} from "react";
import {
    Box,
    Button,
    Container,
    Fade,
    Grid,
    InputLabel,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import {gridDBlock} from "../Home";
import {ErrorMessage, Form, Formik, FormikValues} from "formik";
import {MAX_VARIATION, MIN_VARIATION} from "../../models/consts";
import {AttachMoney, Euro} from "@mui/icons-material";
import {FluctuationRate} from "../FluctuationRate";
import {useRateContext} from "../context/RateContext";
import {Currency} from "./Currency";
import {CurrencyEnum} from "../../models/currency.enum";
import {Operation} from "../../models/operation.class";
import {ConverterTable} from "./Table/ConverterTable";

interface Props {
    showBtn: boolean;
}

interface OperationFormErrors {
    input_amount?: string,
    rate?: string
}

const btnStyle = {

    backgroundColor: 'lightsalmon',
    padding: '8px',
    width: '100%',
    textShadow: '0 0 1px black',
    fontSize: '18px',
    fontWeight: '700',
    borderRadius: '0',
    textTransform: 'math-auto',
    '&:hover': {
        backgroundColor: 'transparent',
    }
}

const formStyle = {
    position: 'relative',
    textAlign: 'center',
    padding: '32px'
}
const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.8);',
    display: 'inline-block',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
}

const resultBox = {
    height: '200px',
    padding: '32px',
    textAlign: 'center'
}
export const Converter: React.FC<Props> = ({showBtn}) => {
    const [btnClicked, setBtnClicked] = useState(false);
    const [activeFixedRate, setActiveFixedRate] = useState(false);
    const context = useRateContext();
    const [arrayOperations, setArrayOperations] = useState(new Array<Operation>());
    const getCurrencyIcon = () => {
        if (context.inputCurrency === CurrencyEnum.EUR)
            return <Euro color={'warning'}/>
        return <AttachMoney color={'success'}/>
    }
    const handleFixedRateSwitch = () => {
        context.applyActiveFixedRate(!activeFixedRate);
        setActiveFixedRate(!activeFixedRate);
    }

    /**
     * Polling callback
     *
     * The handleCalculate() function takes the form parameters and checks if the converter is in Fixed Rate Mode.
     * It does a simple conversion based on the input currency against the output currency
     * The methods to check if the variation is 2% higher with the fixed rate than the real rate are provided by the
     * Operation class.
     *
     * It also updates the context with the calculated values provided by the form
     *
     * Params:
     * values – Values of fields in the form
     * Returns:
     * void
     * **/
    const handleCalculate = (values: FormikValues) => {
        const operation = new Operation(context);
        operation.id = new Date().getTime().toString()
        if (operation.getIsFixedRateTwoPercentHigher()) {
            context.applyActiveFixedRate(false);
            setActiveFixedRate(false)
        }
        let rateValue = getRateValuePolling(values);
        const inputAmount = values.input_amount;
        let changeResult: number;
        if (context.inputCurrency === CurrencyEnum.DOLLAR) {
            changeResult = inputAmount / rateValue;
        } else {
            changeResult = rateValue * inputAmount;
        }
        context.applyInputAmount(inputAmount);
        context.applyCurrentAmount(parseFloat(changeResult.toPrecision(6)));
        if (arrayOperations.length > 0) {
            let newArrayOperations: Operation[] = [...arrayOperations];
            if (arrayOperations.length === 5)
                newArrayOperations.pop();
            newArrayOperations.push(operation);
            setArrayOperations(newArrayOperations.reverse());
        } else {
            let newArrayOperations: Operation[] = [];
            newArrayOperations.push(operation);
            setArrayOperations(newArrayOperations);
        }
    }

    const handleClickCalculate = (values: FormikValues) => {
        let rateValue = getRateValue(values);
        let rateValueFloat = parseFloat(values.rate);
        const inputAmount = parseFloat(values.input_amount);
        let changeResult;
        if (context.inputCurrency === CurrencyEnum.DOLLAR) {
            changeResult = inputAmount / rateValue;
        } else {
            changeResult = rateValue * inputAmount;
        }

        context.applyRate(parseFloat(rateValueFloat.toPrecision(6)));
        context.applyInputAmount(parseFloat(inputAmount.toPrecision(6)));
        context.applyCurrentAmount(parseFloat(changeResult.toPrecision(6)));
    }
    const changeCurrency = useCallback(() => {
        const inputCurrency = context.inputCurrency;
        const currentCurrency = context.currentCurrency;
        context.applyCurrentCurrency(inputCurrency);
        context.applyInputCurrency(currentCurrency);
        let changeResult;
        if (currentCurrency === CurrencyEnum.DOLLAR) {
            changeResult = context.inputAmount / context.rate;
        } else {
            changeResult = context.rate * context.inputAmount;
        }
        context.applyCurrentAmount(changeResult);
    }, [context.applyCurrentCurrency, context.applyInputCurrency])


    const getRateValuePolling = (values: FormikValues): number => {
        let variation = parseFloat(((Math.random() * (MAX_VARIATION - MIN_VARIATION)) + MIN_VARIATION).toPrecision(6));
        let rateValue;
        let rateValueFloat = parseFloat(values.rate);
        if (!context.activeFixedRate) {
            if (btnClicked)
                rateValue = parseFloat(rateValueFloat.toPrecision(6)) + variation;
            else
                rateValue = parseFloat(context.rate.toPrecision(6)) + variation;
            context.applyRate(rateValue);
        } else {
            if (values.rate !== 0) {
                rateValue = parseFloat(rateValueFloat.toPrecision(6)) + variation;
            } else {
                rateValue = parseFloat(context.rate.toPrecision(6)) + variation;
            }
            context.applyFixedRate(rateValue);
        }
        context.applyVariation(variation);
        return rateValue;
    }
    const getRateValue = (values: FormikValues): number => {
        let rateValue;
        let rateValueFloat = parseFloat(values.rate);
        if (!context.activeFixedRate) {
            if (parseFloat(values.rate) !== 0)
                rateValue = parseFloat(rateValueFloat.toPrecision(6));
            else
                rateValue = parseFloat(context.rate.toPrecision(6));
            context.applyRate(rateValue);
        } else {
            if (values.rate !== 0) {
                rateValue = parseFloat(rateValueFloat.toPrecision(6));
            } else {
                rateValue = parseFloat(context.rate.toPrecision(6));
            }
            context.applyFixedRate(rateValue);
        }
        return rateValue;
    }

    return (
        <Container sx={{zIndex: '1', position: 'relative', height: 'inherit'}} maxWidth={'xl'}>
            <Grid container style={{height: (window.innerHeight) + 'px'}}>
                <Grid item xs={3} sx={gridDBlock}></Grid>
                <Grid item container xs={6} sx={formContainerStyle}>
                    <Fade in={showBtn}
                          {...({ timeout: 3000 })}>
                        <Box sx={formStyle}>
                            <Box sx={{padding: '16px'}}>
                                <Typography sx={{color: 'black'}} variant={'body2'}>Enter the amount you'd like to convert</Typography>
                            </Box>
                                <Formik initialValues={{input_amount: 0, rate: 1.1}}
                                        validate={values => {
                                            const errors: OperationFormErrors = {};
                                            if (!values.input_amount) {
                                                errors.input_amount = 'Amount required.'
                                            } else if (isNaN(+values.input_amount)) {
                                                errors.input_amount = 'Only numbers are authorized.'
                                            }
                                            if (!values.rate) {
                                                errors.rate = 'Rate required.'
                                            } else if (isNaN(+values.rate)) {
                                                errors.rate = 'Only numbers are authorized.'
                                            }
                                            return errors;

                                        }}
                                        onSubmit={(values, {setSubmitting}) => {
                                            handleClickCalculate(values);
                                            setBtnClicked(true);
                                        }}
                                >
                                    {
                                        ({
                                             values,
                                             handleChange,
                                         }) => {
                                            FluctuationRate(() => {
                                                handleCalculate(values);
                                            })
                                            return (<Form>
                                                <InputLabel color={'primary'}> Amount to convert</InputLabel>
                                                <Box sx={{display: 'block', position: 'relative'}}>

                                                    <TextField placeholder={'Amount to convert'}
                                                               sx={{padding: '16px', display: 'inline-block'}}
                                                               onChange={handleChange('input_amount')}
                                                               id={'input_amount'} type={'text'}
                                                               name={'input_amount'} value={values.input_amount}></TextField>
                                                    <Box sx={{display: 'inline-block', position: 'absolute',
                                                        transform: 'translateY(-50%)',
                                                        top: '50%'}}>{getCurrencyIcon()}</Box>

                                                    <ErrorMessage name="input_amount" component="div"/>
                                                </Box>
                                                <InputLabel color={'primary'}> Fixed Exchange rate </InputLabel>
                                                <Box sx={{display: 'inline-block'}}>
                                                    <Switch
                                                        checked={activeFixedRate}
                                                        onChange={handleFixedRateSwitch}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Box>
                                                <Box sx={{display: 'block', position: 'relative'}}>
                                                        <TextField disabled={!context.activeFixedRate}
                                                                   placeholder={'Exchange rate'} sx={{padding: '16px', display: 'inline-block'}}
                                                                   onChange={handleChange('rate')} id={'rate'} type={'text'}
                                                                   name={'rate'} value={values.rate}></TextField>
                                                    <Box sx={{display: 'inline-block', position: 'absolute',
                                                        transform: 'translateY(-50%)',
                                                        top: '50%'}}>
                                                    </Box>
                                                    <ErrorMessage name="rate" component="div"/>
                                                </Box>

                                                <Currency inputCurrency={context.inputCurrency}
                                                          currentCurrency={context.currentCurrency}
                                                          changeCurrency={changeCurrency}
                                                          rate={activeFixedRate ? context.fixedRate : context.rate}
                                                />

                                                <Button type={'submit'} variant={"contained"}
                                                        sx={btnStyle}>Calculate</Button>
                                            </Form>)
                                        }
                                    }
                                </Formik>

                        </Box>
                    </Fade>

                    <Fade in={true} {...({ timeout: 500 })}>
                        <Box sx={resultBox}>
                            {context.inputCurrency === CurrencyEnum.EUR ? <Typography variant={'h6'}>{context.inputAmount} Euro</Typography>: <Typography variant={'h6'}>{context.inputAmount} US Dollar(s)</Typography>} {' = '}
                            {context.currentCurrency === CurrencyEnum.EUR ? <Typography variant={'h6'}>{context.currentAmount} Euro</Typography>: <Typography variant={'h6'}>{context.currentAmount}  US Dollar(s)</Typography>}
                            <ConverterTable arrayOperations={arrayOperations}/>

                        </Box>
                    </Fade>
                </Grid>
                <Grid item xs={3} sx={gridDBlock}></Grid>

            </Grid>
        </Container>
    )
}
