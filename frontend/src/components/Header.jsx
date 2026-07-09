import { Stethoscope, Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-3 rounded-2xl">
            <Stethoscope size={32}/>
          </div>


          <div>

            <h1 className="text-2xl font-bold">
              AI HCP CRM
            </h1>

            <p className="text-cyan-100 text-sm">
              Medical Representative Assistant
            </p>

          </div>

        </div>



        <div className="flex items-center gap-5">


          <Bell 
            size={22}
            className="cursor-pointer"
          />


          <div className="flex items-center gap-2">

            <UserCircle size={30}/>

            <span>
              Sales Rep
            </span>

          </div>


        </div>


      </div>


    </header>
  );
}

export default Header;