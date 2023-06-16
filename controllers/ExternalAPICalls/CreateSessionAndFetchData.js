const expressAsyncHandler = require("express-async-handler");
const axios = require('axios')
const {getConsent} = require("./CreateAndGetConsent");
const {CLIENT_SECRET, CLIENT_ID} = require("../../utils/constants");

const url = `https://fiu-uat.setu.co/sessions`;
const config = {
    headers: {
        'x-client-secret': CLIENT_SECRET,
        'x-client-id': CLIENT_ID
    }
};
const data = {
    "format": "xml",
    "DataRange": {
        "to": "2021-09-01T00:00:00Z",
        "from": "2021-04-01T00:00:00Z"
    },
    "consentId": ""
};

async function createSession(id) {
    try {
        const consent = await getConsent(id);
        if(consent.status !== 'ACTIVE'){
            return "Please provide consent first!";
        }
        else{
            data.consentId = id;
            const response = await axios.post(url, data, config);
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};

async function fetchData(id){
    try{
        const response = await axios.get(url + `/${id}`, config);
        return response.data;
    } catch(err){
        console.log(err);
    }
}

module.exports = {
    createSession,
    fetchData
};

