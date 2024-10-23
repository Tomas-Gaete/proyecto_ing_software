import Typewriter from "../components/Typewriter";
import Nav from "../components/Typewriter";

const LoginPage: React.FC = () => {


  return (

  
  <form action="#" method ="POST" className="space-y-6">


      <div className="min-h-screen flex items-center justify-center bg-black">
        
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          

          <Typewriter/>
        
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-2 ">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="py-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 my-3 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Iniciar Sesión
            </button>

            

            </div>


            <div className="text-sm my-1">
                  <a href="#" className="font-semibold hover:text-indigo-500">
                    No tienes una cuenta?
                  </a>
            </div>

            <div className="mt-4 w-12">
              <a href="/" className="w-12">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg> 
</a>
            </div>

           

        </div>
        
      </div>
    </form>
  );
};

export default LoginPage;
