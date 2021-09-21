import React, {useEffect} from 'react';


async function Random() {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const advice = await response.json();
        const randomAdvice = advice.slip;
        console.log("Random",randomAdvice);
        return{
            props:{
                advice
            }
        }
    } catch (error) {
        console.log(error)
    }

}



export default Random;