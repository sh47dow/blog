import React, {ComponentProps, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {supabase} from "../utils/supabase";
import {UserContext} from "./_app";

const Login = (props: ComponentProps<any>) => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const user = useContext(UserContext);
    useEffect(() => {
        debugger
        if (user) {
            router.push("/");
        }
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
           return undefined;
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
       const { error } = await supabase.auth.signInWithPassword({email: 'zhengruying@nimblex.cn', password});
        if (error) {
            setError(error.message);
        }
    }

    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
          <input type="password" placeholder="密码" className="focus:ring-indigo-500 focus:border-indigo-500 border block py-2 px-3 sm:text-sm border-gray-300 rounded-md w-60" value={password} onInput={(event) => setPassword(event.currentTarget.value)}></input>
          {error && <div className="text-red-500 text-sm w-60 indent-2">{error}</div>}
          <button type="submit" className="hover:bg-blue-600 disabled:bg-gray-500 disabled:pointer-events-none bg-blue-500 mt-2 text-accent-1 py-2 px-3 rounded-md w-60" disabled={!password} onClick={(event) => handleSubmit(event)}>登陆</button>
          <a href="/">直接进入</a>
      </div>
  );
}

export default Login
