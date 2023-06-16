const expressAsyncHandler = require("express-async-handler");
const axios = require('axios')
const {CLIENT_ID, CLIENT_SECRET} = require("../../utils/constants");

const url = `https://fiu-uat.setu.co/consents`;
const config = {
    headers: {
        'x-client-secret': CLIENT_SECRET,
        'x-client-id': CLIENT_ID
    }
};

const data = {
        "Detail": {
            "consentStart": "2023-06-15T17:30:44.881Z",
            "consentExpiry": "2023-06-17T17:30:44.881Z",
            "Customer": {
                "id": "8130315960@onemoney" // {mobile_number@onemoney}
            },
            "FIDataRange": {
                "from": "2021-04-01T00:00:00Z",
                "to": "2021-10-01T00:00:00Z"
            },
            "consentMode": "STORE",
            "consentTypes": [
                "TRANSACTIONS",
                "PROFILE",
                "SUMMARY"
            ],
            "fetchType": "PERIODIC",
            "Frequency": {
                "value": 30,
                "unit": "MONTH"
            },
            "DataFilter": [
                {
                    "type": "TRANSACTIONAMOUNT",
                    "value": "5000",
                    "operator": ">="
                }
            ],
            "DataLife": {
                "value": 1,
                "unit": "MONTH"
            },
            "DataConsumer": {
                "id": "setu-fiu-id"
            },
            "Purpose": {
                "Category": {
                    "type": "string"
                },
                "code": "101",
                "text": "Loan underwriting",
                "refUri": "https://api.rebit.org.in/aa/purpose/101.xml"
            },
            "fiTypes": [
                "DEPOSIT"
            ]
        },
        "context":
            [
                {
                    "key": "accounttype",
                    "value": "CURRENT"
                }
            ],
        "redirectUrl": "https://setu.co"
};

async function createConsent() {
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

async function getConsent(id){
    try{
        const response = await axios.get(url + `/${id}`, config);
        return response.data;
    } catch(err){
        console.log(err);
    }
}

module.exports = {
    createConsent,
    getConsent
};

