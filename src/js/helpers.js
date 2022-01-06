import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

//Helper functions
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function(url) {
    try{
        //Set timeout for the fetch function
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.error}`);
        return data;
    } catch (err) {
        //Throw the error to the module where we call getJSON
        throw err;
    }
}