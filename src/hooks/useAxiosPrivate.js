import React from 'react'
import api from "../components/axiosapi"
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth,token } = useAuth();


    useEffect(() => {

        const requestIntercept = api.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = api.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(responseIntercept);
            api.interceptors.request.eject(requestIntercept);
        }


    }, [auth, refresh]);

    return api;
}

export default useAxiosPrivate
