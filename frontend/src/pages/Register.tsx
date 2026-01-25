import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState('user');

  const register = async () => {
    if(!name || !email || !password || !confirm){
      toast.error("All fields required");
      return;
    }

    if(password.trim() !== confirm.trim()){
      toast.error("Passwords must match");
      return;
    }

    const url = selected === 'user' ? "/api/user/register" : "/api/doctor/register";
    const msg = toast.loading("Registering...")

    try {
      const res = await axios.post(`http://localhost:5000${url}`, {
        name: name.trim(), email: email.trim(), password: password.trim()
      });

      if(res.status === 200){
        toast.success("Success");
        setTimeout(() => {
          navigate('/auth/login');
        }, 1000);
      }
    } catch (err: any) {
      if(err.response.data.message){
        toast.error(err.response.data.message);
      }
      else{
        toast.error("Something went wrong");
      }
    }
    finally{
      toast.dismiss(msg);
    }
  }

  return (
    <>
      <div className={`w-full min-h-screen bg-white flex justify-center items-center relative overflow-hidden`}>

        <p className={`w-full text-black text-lg lg:text-sm text-center absolute top-5 font-Lora`}>MediLab</p>
        <div className={`w-[80%] md:w-[60%] lg:w-[40%] absolute top-14 lg:top-12 h-px bg-linear-to-r from-transparent via-black to-transparent`}></div>

        <img src='/auth-page-bg.jpg' className={`h-1/2 absolute top-1/2 -translate-y-1/2 z-10 object-cover`} />
        <div className={`h-full absolute w-full bg-transparent z-20`}></div>

        <div className={`w-[95%] md:w-[60%] lg:w-[40%] xl:w-[30%] z-30 h-auto rounded-xl backdrop-blur-md flex flex-col justify-center items-center border border-orange-600 px-2 py-5`}>
          <h1 className={`w-full text-xl lg:text-2xl font-semibold font-Telegraf text-start px-3`}>Create an account</h1>
          <p className={`w-full text-[12px] text-start px-3 font-Telegraf`}>Make your medical journey more reliable</p>

          <div className={`w-full flex flex-col justify-center items-center gap-2 pt-5 pb-4 px-3`}>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className={`w-full outline-none bg-white py-2 px-3 text-sm`} placeholder='Enter Name' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className={`w-full outline-none bg-white py-2 px-3 text-sm`} placeholder='Enter Email' />

            <div className='w-full flex justify-center items-center relative'>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className={`w-full outline-none bg-white py-2 px-3 text-sm`} placeholder='Enter Password' />
              <span onClick={() => setVisible(!visible)} className={`absolute right-2 cursor-pointer opacity-50`}>{visible ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            <div className='w-full flex justify-center items-center relative'>
              <input onChange={(e) => setConfirm(e.target.value)} value={confirm} type={visible ? "text" : "password"} className={`w-full outline-none bg-white py-2 px-3 text-sm`} placeholder='Confirm password' />
              <span onClick={() => setVisible(!visible)} className={`absolute right-2 cursor-pointer opacity-50`}>{visible ? <FaEyeSlash /> : <FaEye />}</span>
            </div>

            <div className={`w-full my-2 flex justify-start items-center gap-2`}>
              <p onClick={() => setSelected('user')} className={`text-[12px] py-1 cursor-pointer ${selected === 'user' ? "bg-blue-500 text-white" : "bg-white text-black"} duration-150 ease-in-out px-4 `}>User</p>
              <p onClick={() => setSelected('doctor')} className={`text-[12px] py-1 cursor-pointer ${selected === 'doctor' ? "bg-blue-500 text-white" : "bg-white text-black"} duration-150 ease-in-out px-4 `}>Doctor</p>
            </div>

            <p onClick={register} className={`w-full text-center py-2 mt-2 cursor-pointer active:opacity-80 active:scale-95 duration-150 ease-in-out font-Telegraf font-semibold bg-[#f8a085]`}>Register</p>

          </div>

          <p className={`w-full text-center text-black font-Telegraf text-[12px] mt-2`}>Already have an account ?</p>
          <Link to='/auth/login' className={`w-full text-center font-semibold text-blue-500 font-Telegraf text-sm`}>Enter profile</Link>
        </div>
      </div>
    </>
  )
}


export default Register
