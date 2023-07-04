import {createContext, useContext, useEffect, useState} from 'react';
import {CurrencyEnum} from "../../models/currency.enum";
import * as React from "react";
import PropTypes from 'prop-types';

export interface RateContextType {
    rate: number;
    variation: number;
    inputCurrency: CurrencyEnum;
    inputAmount: number
    currentCurrency: CurrencyEnum;
    currentAmount: number;
    fixedRate: number;
    activeFixedRate: boolean;
    id?: string;
    date?: Date;
    applyRate: (rate: number) => void,
    applyCurrentAmount: (currentAmount: number) => void,
    applyActiveFixedRate: (activeFixedRate: boolean) => void,
    applyCurrentCurrency: (currentCurrency: number) => void,
    applyFixedRate: (fixedRate: number) => void,
    applyInputAmount: (inputAmount: number) => void,
    applyInputCurrency: (inputCurrency: number) => void,
    applyVariation: (variation: number) => void,
}
const RateContext = createContext<RateContextType>({
    rate: 1.1,
    currentAmount: 0,
    activeFixedRate: false,
    currentCurrency: CurrencyEnum.DOLLAR,
    fixedRate: 0,
    inputAmount: 0,
    inputCurrency: CurrencyEnum.EUR,
    variation: 0,
    applyRate: (rate: number) => {},
    applyCurrentAmount: (currentAmount: number) => {},
    applyActiveFixedRate: (activeFixedRate: boolean) => {},
    applyCurrentCurrency: (currentCurrency: number) => {},
    applyFixedRate: (fixedRate: number) => {},
    applyInputAmount: (inputAmount: number) => {},
    applyInputCurrency: (inputCurrency: number) => {},
    applyVariation: (variation: number) => {},
});
export const useRateContext = () => useContext(RateContext);

interface Props {
    children: any
}

/**
 * RateProvider
 * The provider for the Converter component.
 * It provides the Converter component with all necessary methods and attributes of RateContext which is the App's Context.
 * **/
function RateProvider(children: Props) {
    const [rate, setRate] = useState(1.1);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [activeFixedRate, setActiveFixedRate] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(CurrencyEnum.DOLLAR);
    const [fixedRate, setFixedRate] = useState(0);
    const [inputAmount, setInputAmount] = useState(0);
    const [inputCurrency, setInputCurrency] = useState(CurrencyEnum.EUR);
    const [variation, setVariation] = useState(0);

    const applyRate = (rate: number) => {
        setRate(parseFloat(rate.toPrecision(6)));
    }
    const applyCurrentAmount = (currentAmount: number) => {
        setCurrentAmount(currentAmount);
    }
    const applyActiveFixedRate = (activeFixedRate: boolean) => {
        setActiveFixedRate(activeFixedRate);
    }
    const applyCurrentCurrency = (currentCurrency: number) => {
        setCurrentCurrency(currentCurrency);
    }
    const applyFixedRate = (fixedRate: number) => {
        setFixedRate(fixedRate);
    }
    const applyInputAmount = (inputAmount: number) => {
        setInputAmount(inputAmount);
    }
    const applyInputCurrency = (inputCurrency: number) => {
        setInputCurrency(inputCurrency);
    }
    const applyVariation = (variation: number) => {
        setVariation(variation);
    }

    return (<RateContext.Provider value={{
        rate,
        currentAmount,
        activeFixedRate,
        currentCurrency,
        fixedRate,
        inputAmount,
        inputCurrency,
        variation,
        applyRate,
        applyCurrentAmount,
        applyActiveFixedRate,
        applyCurrentCurrency,
        applyFixedRate,
        applyInputAmount,
        applyInputCurrency,
        applyVariation,

    }}>
        {children.children}
    </RateContext.Provider>)
}

RateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RateProvider;