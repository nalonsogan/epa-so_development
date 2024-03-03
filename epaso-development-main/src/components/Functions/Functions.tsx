import axios from 'axios';
// import { useState } from 'react';
import { useEffect, useState } from 'react';


export default function Functions(){

    const [data, getAccessToken] = useState<any>();


    useEffect(() => {
        
        console.log("entra en functions")

        var client_id = '6cca465c-9b3c-458d-90be-487d9ad333ab@bbcd7dc9-e3e1-4af6-bf83-177e900e272b';
        var client_secret = 'WS88Q~pEYy7kWTw7URe1YcQWwsH4Jeb_BzRDmaYR';
        var grant_type = "client_credentials";

        console.log("tell me pls")

        var access_token = "";
        const postData = {
            client_id: client_id,
            resource: '00000003-0000-0ff1-ce00-000000000000/alonsogan.sharepoint.com@bbcd7dc9-e3e1-4af6-bf83-177e900e272b',
            client_secret: client_secret,
            grant_type: grant_type
        };

        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // axios.defaults.headers.post['credentials'] = 'omit';
       
        axios.defaults.headers.post['Access-Control-Allow-Origin'] ='*';
        // axios.defaults.headers.post['mode'] ='no-cors';
        

   

        axios
            .post('https://accounts.accesscontrol.windows.net/bbcd7dc9-e3e1-4af6-bf83-177e900e272b/tokens/OAuth/2/',postData)
            .then(response => {
                // console.log(response.data.access_token);
                access_token = response.data.access_token
                getAccessToken(access_token)
                
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    return data;
}




    


