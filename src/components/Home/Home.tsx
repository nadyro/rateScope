import {Container} from "@mui/material";
import {useCallback, useRef, useState} from "react";
import {Converter} from "../Converter";
import {Introduction} from "../Introduction";
import RateProvider from "../context/RateContext";
export const gridDBlock = {
    display: 'inline-block'
}
export const Home = () => {
    const [showBtn, setShowBtn] = useState(false);
    const ref = useRef(null);
    const handleBtnClick = useCallback(() => {
        // @ts-ignore
        ref?.current.scrollIntoView({behavior: 'smooth'});
        setShowBtn(true)
    }, []);

    return (<Container sx={{zIndex: '1', position: 'relative', height: 'inherit'}} maxWidth={'xl'}>
        <Introduction handleBtnClick={handleBtnClick}/>
        <div ref={ref}>
            <RateProvider>
                <Converter showBtn={showBtn}/>
            </RateProvider>
        </div>
    </Container>)
}

