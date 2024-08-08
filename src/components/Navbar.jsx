import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"

const Navbar = () => {
  return (
    <header className="w-full py-5 flex px-5 sm:px-10 justify-between items-center">
        <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="" width={14} height={18}/>

        <div className="flex flex-1 justify-center max-sm:hidden">
            {navLists.map(nav => <div key={nav} className="px-5 text-sm cursor-pointer text-gray-100 hover:text-white transition-all"> 
                    {nav}
            </div> )}
        </div>
        
        <div className="flex gap-7 items-baseline max-sm:justify-end max-sm:flex-1">  
        <img src={searchImg} alt="searchimg" width={18} height={18}/>
        <img src={bagImg} alt="bagimg" width={18} height={18} />
        </div>

        </nav>
    </header>
  )
}

export default Navbar
