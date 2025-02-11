import axios from 'axios';
import React from 'react'
import api from '../components/axiosapi'
import useAuth from './useAuth'



const useRefreshToken = () => {
    const { auth, setauth, settoken } = useAuth();

    const refresh = async () => {
        const response = await api.get('refresh/get-access-token');
        // console.log(response)
        setauth(prev => {
            // console.log(auth);
            if (response?.data?.status) {
                // console.log("Old Token: "+auth.accessToken);
                // console.log("New Token: "+response.data.accessToken)
                // return {...prev,
                //     accessToken:response.data.accessToken}
                settoken(response.data.token)
                return response.data.data;
            }
            else {
                // console.log("Refresh Token  Expired need to login again");
                // console.log("Add Navigate here to login page")
                // navigate
                settoken(null)
                return ({});
            }

        });
        return response.data.token;
    }

    return refresh;
}

export default useRefreshToken;