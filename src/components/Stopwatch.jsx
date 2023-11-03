import { useState } from 'react'
import './stopwatch.css'

export default function StopWatch(){

    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [milisseconds, setMilisseconds] = useState("00");

    const [timeFunction, setTimeFunction] = useState(null);

    const formatTimeToView = (time) => {

        if(time > 59){

            return "00";
        }else{

            return time < 10 ? `0${time}` : time;
        }
    }

    const formatMilissecondsToView = (milisseconds) => {

        if(milisseconds < 100){

            return milisseconds;
        }else{

            const time = milisseconds / 10;
            return Math.trunc(time);
        }
    }

    const start = () => {

        //Recupera o estado anterior.
        let milissecondsCounter = parseInt(milisseconds) * 10;
        let secondsCounter = parseInt(seconds);
        let minutesCounter = parseInt(minutes);

        const time = setInterval(() => {

            //Adiciona as horas.
            if(milissecondsCounter !== 1000){

                milissecondsCounter += 10;
                setMilisseconds(formatMilissecondsToView(milissecondsCounter));
            }
            
            //Verificações para determinar se as horas, minutos e segundos já passaram.
            if(milissecondsCounter === 1000){

                milissecondsCounter = 0;
                setSeconds(formatTimeToView(++secondsCounter))

                if(secondsCounter === 60){

                    milissecondsCounter = secondsCounter = 0;
                    setMinutes(formatTimeToView(++minutesCounter))
                }
            }

        }, 10);
        setTimeFunction(time)
    }

    const stop = () => {

        clearInterval(timeFunction);
    }

    const reset = () => {

        clearInterval(timeFunction);
        setMilisseconds("00");
        setSeconds("00");
        setMinutes("00");
    }

    return(

        <main className="stopwatch">
            <div className='clock'>
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
                <span>:</span>
                <span>{milisseconds}</span>
            </div>

            <div className='clockbuttons'>
                <button onClick={start} type="button" className='start'>Iniciar</button>    
                <button onClick={stop} type="button" className='pause'>Pausar</button>    
                <button onClick={reset} type="button" className='reset'>Zerar</button>    
            </div>  
            
        </main>
    )
}