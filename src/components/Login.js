import React, { useState } from 'react'
import logo from '../logo_square.jpg'
import logo1 from '../logo_flat.png'
import api from './axiosapi';
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Loader from './Loader'
import modal from '../context/ModalContext';
import Logout from '../modals/Logout';
import useModal from '../hooks/useModal';

const Login = () => {

    const navigate = useNavigate();

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const { setauth, setadminname,token, settoken } = useAuth();

    const [loading, setloading] = useState(false);

    const [inputs, setinputs] = useState({});


    function handlechange(event) {
        event.preventDefault();
        const name = event.target.name.trim();
        const value = event.target.value.trim();

        setinputs(values => ({ ...values, [name]: value }))
    }


    const handlesubmit = async (event) => {
        event.preventDefault();
        setloading(true);
        // console.log(inputs)

        try {
            await api.post('user/login', JSON.stringify(inputs), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response?.data?.token) {
                    // setadminname(inputs.admin_id)
                    localStorage.setItem("user", response.data.data)
                    localStorage.setItem("token", response.data.token)
                    setauth(response.data.data);
                    settoken(response.data.token)
                    setloading(false);
                    navigate("/", { replace: true })
                }
                else {
                    setloading(false);
                    setmodal(true);
                    setmodalmessage({
                        "text1": "Error Occured",
                        "text2": response.data.message
                    });
                }

            }
            )

        } catch (error) {
            setloading(false);
            console.log("No server response");
            setmodal(true);
            setmodalmessage({
                "text1": "Error Occured",
                "text2": "No server response"
            });
        }
    }

    const ForgotPassword = () => {
        navigate("/forgot")
    }





    return (
        <>

            {
                loading
                    ? <Loader />
                    : <></>
            }

            {
                modal
                    ? <Logout />
                    : <></>
            }


            <div className='min-h-screen flex items-center justify-center bg-login p-2'>
                <div className='relative m-4 h-96 sm:max-h-96 w-full max-w-4xl rounded-lg flex justify-end sm:h-auto items-center sm:shadow-lg sm:backdrop-blur-md bg-none sm:bg-white/30 border'>


                    <img className='hidden md:block absolute left-5 lg:left-8 h-auto w-6/12 drop-shadow-[-1px_1px_5px_rgba(0,0,0,0.2)]' srcSet={logo1} alt="" />
                    <img className='absolute hidden sm:block md:hidden left-10 h-auto w-4/12 drop-shadow-[-2px_2px_5px_rgba(0,0,0,0.2)]' srcSet={logo1} alt="" />



                    <form onSubmit={handlesubmit} className='relative right-0 w-full sm:w-[45%] md:w-[40%] lg:w-[35%] h-[425px] border border-slate-200 sm:border-blue-100 shadow-lg backdrop-blur-md bg-white/50 sm:bg-white sm:mr-8 lg:mr-14 rounded-lg p-4 logintext'>
                        <span className='sm:hidden absolute h-32 w-32 top-0 left-1/2 -translate-x-1/2 bg-transparent p-5'>
                            <img className='h-24 w-32 drop-shadow-[-2px_2px_5px_rgba(0,0,0,0.2)]' srcSet={logo} alt="" />

                        </span>


                        <p className='hidden sm:block w-full font-semibold text-center text-5xl p-6 mt-12 sm:mt-6 mb-3 tracking-wider logintext text-fix'>LOGIN</p>

                        <input
                            onChange={handlechange} name="email"
                            type="email"
                            placeholder="Email"
                            className="placeholder-slate-500 font-semibold text-lg sm:text-base mt-32 sm:mt-1 w-full rounded-lg sm:rounded-full border-2 text-slate-900 border-slate-500 bg-transparent focus:border-blue-800 focus:outline-none focus:ring-0"
                        />

                        <input
                            onChange={handlechange} name="password"
                            type="password"
                            placeholder="Password"
                            className="placeholder-slate-500  font-semibold text-lg sm:text-base mt-7 w-full rounded-lg sm:rounded-full border-2 text-slate-900 border-slate-500 bg-transparent focus:border-blue-800 focus:outline-none focus:ring-0"
                        />

                        {/* <p className='text-blue-500 m-1 mt-3'>
                            <i onClick={ForgotPassword} className='cursor-pointer'>Forgot Password?</i>
                        </p> */}


                        <div className='flex justify-center items-center w-full mt-9'>
                            <button disabled={loading} className="edit-btn text-xl p-3 sm:p-2 w-4/5 rounded-lg sm:rounded-full bg-blue-800 font-semibold text-white hover:bg-blue-800 hover:border-white">LOGIN</button>
                        </div>

                    </form>



                </div>
            </div>

        </>


    )
}

export default Login