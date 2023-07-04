import {useEffect, useRef} from "react";

export const FluctuationRate: any = (cb: any) =>  {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = cb
    }, [cb]);
    useEffect(() => {
        const tick = () => {
            // @ts-ignore
            savedCallback.current();
        }
        const id = setInterval(tick, 3000);
        return () => {
            clearInterval(id);
        }
    })
}
