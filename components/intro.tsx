import {useContext} from "react";
import {UserContext} from "../pages/_app";

const Intro = () => {
  const user = useContext(UserContext);
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          {process.env.NEXT_PUBLIC_APP_NAME}.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Hello, {user?.role === 'authenticated' ? 'Master' : 'Guest'}.
      </h4>
    </section>
  )
}

export default Intro
