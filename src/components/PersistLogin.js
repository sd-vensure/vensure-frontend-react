import React, { useState, useEffect } from 'react'
// import { useState,useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Loader from './Loader';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
// import Loader from './Loader';


const PersistLogin = () => {

  const [loading, setloading] = useState(true);
  const refresh = useRefreshToken();
  const { auth,token } = useAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        await refresh();
      }
      catch (err) {
        // console.error(err);
      }
      finally {
        setloading(false);
      }
    }

    !token
      ? verify()
      : setloading(false);

  }, []);


  return (
    <>
      {
        loading
          ? <Loader />
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin