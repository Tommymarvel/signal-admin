'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(272);
  const [isClient, setIsClient] = useState(false); // Default width
  const [openSubMenu, setOpenSubMenu] = useState(false)
  useEffect(() => {
    setIsClient(true); // Set true once component mounts
    if(window.innerWidth > 1024){
      setSidebarWidth((0.19 * window.innerWidth))
    }
  }, []);
  const toggleSubMenu = ()=>{
    setOpenSubMenu(!openSubMenu)
  }
  
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    
    const startX = event.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
    const newWidth = startWidth + (moveEvent.clientX - startX);
    setSidebarWidth(Math.max(250, Math.min(newWidth, 350))); // Min 250px, Max 350px
    };

    const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };


  if (!isClient) return null;
  return (
    <div
    className="flex h-screen bg-white "
    style={{ width: sidebarWidth }}
    >
      <div className="" style={{ width: sidebarWidth }}>
        <div className=" border-b border-gray-100 ">
          <Image src={`/dashboard/sidebarlogo.svg`} alt="" className="my-4 lg:my-7 mx-3 h-auto" width={182} height={30} priority />
        </div>
        <div className="flex flex-col p-4 font-man-rope h-[80vh]">
          <NavLink to="/" text="Dashboard">
            <DashboardSvg/>
          </NavLink>
          <div className="mt-5 mb-auto">
            <p className="flex items-center justify-between cursor-pointer px-5 text-gray-400 font-semibold text-[1.2vw] mb-2" onClick={toggleSubMenu}>PLATFORM<Image src={`/dashboard/arrow-up.svg`} className={`transition-all ease-in-out duration-300 ${!openSubMenu && 'rotate-180'}`} alt="" width={16} height={16}/></p>
            <div className={`max-h-0 overflow-hidden transition-all duration-300 ${openSubMenu && 'max-h-96'}`}>
              <NavLink to='/userManagement' text="User Management">
                <UserManageSvg/>
              </NavLink>
              <NavLink to='/tradeManagement' text="Trade Management">
              <TradeManageSvg/>
              </NavLink>
              <NavLink to='/transactions' text="Transactions">
                <TransactionSvg/>
              </NavLink>
              <NavLink to='/wallet' text="Wallet">
               <FeesSvg/>
              </NavLink>
              <NavLink to='/adminManagement' text="Admin Management">
               <HashSvg/>
              </NavLink>
              <NavLink to='/kycs' text="Kyc Requests">
               <HashSvg/>
              </NavLink>
            </div>
          </div>
          <div className="">
            <NavLink to="/settings" text="Settings">
              <SettingSvg/>
            </NavLink>
            <NavLink to="/logout" text="Logout">
              <LogoutSvg/>
            </NavLink>
          </div>
        </div>
      </div>
      <div
      className="w-[1px] cursor-grab bg-gray-100 hover:bg-gray-200 hover:w-1"
      onMouseDown={handleMouseDown}
      ></div>
    </div>
  )
}

export default Sidebar

const DashboardSvg = ({active} : {active ?: boolean})=>{
  return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3333 7.1V3.31666C18.3333 2.14166 17.8 1.66666 16.475 1.66666H13.1083C11.7833 1.66666 11.25 2.14166 11.25 3.31666V7.09166C11.25 8.275 11.7833 8.74166 13.1083 8.74166H16.475C17.8 8.75 18.3333 8.275 18.3333 7.1Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M18.3333 16.475V13.1083C18.3333 11.7833 17.8 11.25 16.475 11.25H13.1083C11.7833 11.25 11.25 11.7833 11.25 13.1083V16.475C11.25 17.8 11.7833 18.3333 13.1083 18.3333H16.475C17.8 18.3333 18.3333 17.8 18.3333 16.475Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M8.75 7.1V3.31666C8.75 2.14166 8.21667 1.66666 6.89167 1.66666H3.525C2.2 1.66666 1.66667 2.14166 1.66667 3.31666V7.09166C1.66667 8.275 2.2 8.74166 3.525 8.74166H6.89167C8.21667 8.75 8.75 8.275 8.75 7.1Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M8.75 16.475V13.1083C8.75 11.7833 8.21667 11.25 6.89167 11.25H3.525C2.2 11.25 1.66667 11.7833 1.66667 13.1083V16.475C1.66667 17.8 2.2 18.3333 3.525 18.3333H6.89167C8.21667 18.3333 8.75 17.8 8.75 16.475Z" fill={active ? "#0F973D" :"#202020"}/>
    </svg>
  )
}

const TransactionSvg = ({active}: {active ?: boolean})=>{
  return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.2667 10.0004C17.4333 10.0004 18.3333 9.1671 17.5333 6.43377C16.9917 4.5921 15.4083 3.00877 13.5667 2.4671C10.8333 1.6671 10 2.5671 10 4.73377V7.13377C10 9.1671 10.8333 10.0004 12.5 10.0004H15.2667Z" stroke={active ? '#0F973D' : "#202020"} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.6667 12.2503C15.8917 16.1087 12.1917 18.9087 7.98334 18.2253C4.82501 17.717 2.28334 15.1753 1.76667 12.017C1.09167 7.82534 3.87501 4.12534 7.71667 3.34201" stroke={active ? '#0F973D' : "#202020"} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
}

const FeesSvg = ({active}: {active ?: boolean})=>{
  return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3333 7.70834H1.66667C1.325 7.70834 1.04167 7.42501 1.04167 7.08334C1.04167 6.74168 1.325 6.45834 1.66667 6.45834H18.3333C18.675 6.45834 18.9583 6.74168 18.9583 7.08334C18.9583 7.42501 18.675 7.70834 18.3333 7.70834Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M6.66667 14.375H5C4.65833 14.375 4.375 14.0917 4.375 13.75C4.375 13.4083 4.65833 13.125 5 13.125H6.66667C7.00833 13.125 7.29167 13.4083 7.29167 13.75C7.29167 14.0917 7.00833 14.375 6.66667 14.375Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M12.0833 14.375H8.75C8.40833 14.375 8.125 14.0917 8.125 13.75C8.125 13.4083 8.40833 13.125 8.75 13.125H12.0833C12.425 13.125 12.7083 13.4083 12.7083 13.75C12.7083 14.0917 12.425 14.375 12.0833 14.375Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M14.6333 17.7083H5.36667C2.05 17.7083 1.04167 16.7083 1.04167 13.425V6.57499C1.04167 3.29166 2.05 2.29166 5.36667 2.29166H14.625C17.9417 2.29166 18.95 3.29166 18.95 6.57499V13.4167C18.9583 16.7083 17.95 17.7083 14.6333 17.7083ZM5.36667 3.54166C2.75 3.54166 2.29167 3.99166 2.29167 6.57499V13.4167C2.29167 16 2.75 16.45 5.36667 16.45H14.625C17.2417 16.45 17.7 16 17.7 13.4167V6.57499C17.7 3.99166 17.2417 3.54166 14.625 3.54166H5.36667Z" fill={active ? "#0F973D" :"#202020"}/>
    </svg>
    )
}

const UserManageSvg = ({active}: {active ?: boolean})=>{
  return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.63303 9.68334C7.60803 9.68334 7.59136 9.68334 7.56636 9.68334C7.52469 9.675 7.46636 9.675 7.41636 9.68334C4.99969 9.60834 3.17469 7.70834 3.17469 5.36667C3.17469 2.98334 5.11636 1.04167 7.49969 1.04167C9.88303 1.04167 11.8247 2.98334 11.8247 5.36667C11.8164 7.70834 9.98303 9.60834 7.65803 9.68334C7.64969 9.68334 7.64136 9.68334 7.63303 9.68334ZM7.49969 2.29167C5.80803 2.29167 4.42469 3.67501 4.42469 5.36667C4.42469 7.03334 5.72469 8.375 7.38303 8.43334C7.43303 8.425 7.54136 8.425 7.64969 8.43334C9.28303 8.35834 10.5664 7.01667 10.5747 5.36667C10.5747 3.67501 9.19136 2.29167 7.49969 2.29167Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M13.783 9.79166C13.758 9.79166 13.733 9.79166 13.708 9.78333C13.3664 9.81666 13.0164 9.575 12.983 9.23333C12.9497 8.89166 13.158 8.58333 13.4997 8.54166C13.5997 8.53333 13.708 8.53333 13.7997 8.53333C15.0164 8.46666 15.9664 7.46666 15.9664 6.24166C15.9664 4.97499 14.9414 3.94999 13.6747 3.94999C13.333 3.95833 13.0497 3.67499 13.0497 3.33333C13.0497 2.99166 13.333 2.70833 13.6747 2.70833C15.6247 2.70833 17.2164 4.3 17.2164 6.24999C17.2164 8.16666 15.7164 9.71666 13.808 9.79166C13.7997 9.79166 13.7914 9.79166 13.783 9.79166Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M7.64134 18.7917C6.00801 18.7917 4.36634 18.375 3.12467 17.5417C1.96634 16.775 1.33301 15.725 1.33301 14.5833C1.33301 13.4417 1.96634 12.3833 3.12467 11.6083C5.62467 9.94999 9.67467 9.94999 12.158 11.6083C13.308 12.375 13.9497 13.425 13.9497 14.5667C13.9497 15.7083 13.3163 16.7667 12.158 17.5417C10.908 18.375 9.27467 18.7917 7.64134 18.7917ZM3.81634 12.6583C3.01634 13.1917 2.58301 13.875 2.58301 14.5917C2.58301 15.3 3.02467 15.9833 3.81634 16.5083C5.89134 17.9 9.39134 17.9 11.4663 16.5083C12.2663 15.975 12.6997 15.2917 12.6997 14.575C12.6997 13.8667 12.258 13.1833 11.4663 12.6583C9.39134 11.275 5.89134 11.275 3.81634 12.6583Z" fill={active ? "#0F973D" :"#202020"}/>
    <path d="M15.283 17.2917C14.9913 17.2917 14.733 17.0917 14.6747 16.7917C14.608 16.45 14.8247 16.125 15.158 16.05C15.683 15.9417 16.1663 15.7333 16.5413 15.4417C17.0163 15.0833 17.2747 14.6333 17.2747 14.1583C17.2747 13.6833 17.0163 13.2333 16.5497 12.8833C16.183 12.6 15.7247 12.4 15.183 12.275C14.8497 12.2 14.633 11.8667 14.708 11.525C14.783 11.1917 15.1163 10.975 15.458 11.05C16.1747 11.2083 16.7997 11.4917 17.308 11.8833C18.083 12.4667 18.5247 13.2917 18.5247 14.1583C18.5247 15.025 18.0747 15.85 17.2997 16.4417C16.783 16.8417 16.133 17.1333 15.4163 17.275C15.3663 17.2917 15.3247 17.2917 15.283 17.2917Z" fill={active ? "#0F973D" :"#202020"}/>
    </svg>
    )
}

const TradeManageSvg = ({active}: {active ?: boolean})=>{
  return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 18.3333H12.5C16.6667 18.3333 18.3333 16.6667 18.3333 12.5V7.49999C18.3333 3.33332 16.6667 1.66666 12.5 1.66666H7.5C3.33333 1.66666 1.66667 3.33332 1.66667 7.49999V12.5C1.66667 16.6667 3.33333 18.3333 7.5 18.3333Z" stroke={active ? '#0F973D' : "#202020"} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.2917 11.5172L11.7584 14.0506" stroke={active ? '#0F973D' : "#202020"} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.70831 11.5172H14.2916" stroke={active ? '#0F973D' : "#202020"} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.70832 8.48417L8.24165 5.95084" stroke={active ? '#0F973D' : "#202020"} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.2917 8.48447H5.70832" stroke={active ? '#0F973D' : "#202020"} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const SettingSvg = ({active}: {active ?: boolean})=>{
  return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke={active ? '#0F973D' : "#202020"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.66667 10.7337V9.267C1.66667 8.40033 2.375 7.68367 3.25 7.68367C4.75833 7.68367 5.375 6.617 4.61667 5.30867C4.18333 4.55867 4.44167 3.58367 5.2 3.15033L6.64167 2.32533C7.3 1.93367 8.15 2.167 8.54167 2.82533L8.63333 2.98367C9.38333 4.292 10.6167 4.292 11.375 2.98367L11.4667 2.82533C11.8583 2.167 12.7083 1.93367 13.3667 2.32533L14.8083 3.15033C15.5667 3.58367 15.825 4.55867 15.3917 5.30867C14.6333 6.617 15.25 7.68367 16.7583 7.68367C17.625 7.68367 18.3417 8.392 18.3417 9.267V10.7337C18.3417 11.6003 17.6333 12.317 16.7583 12.317C15.25 12.317 14.6333 13.3837 15.3917 14.692C15.825 15.4503 15.5667 16.417 14.8083 16.8503L13.3667 17.6753C12.7083 18.067 11.8583 17.8337 11.4667 17.1753L11.375 17.017C10.625 15.7087 9.39167 15.7087 8.63333 17.017L8.54167 17.1753C8.15 17.8337 7.3 18.067 6.64167 17.6753L5.2 16.8503C4.44167 16.417 4.18333 15.442 4.61667 14.692C5.375 13.3837 4.75833 12.317 3.25 12.317C2.375 12.317 1.66667 11.6003 1.66667 10.7337Z" stroke={active ? '#0F973D' : "#202020"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const HashSvg = ({active}: {active ?: boolean})=>{
  return(<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.83333 14.6668L7.16667 1.3335M8.83333 14.6668L12.1667 1.3335M3 5.50016H14.6667M1.33333 10.5002H13" stroke={active ? '#0F973D' : "#202020"} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const LogoutSvg = ({logout}: {logout ?: boolean})=>{
  return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.41669 6.3002C7.67502 3.3002 9.21669 2.0752 12.5917 2.0752H12.7C16.425 2.0752 17.9167 3.56686 17.9167 7.29186V12.7252C17.9167 16.4502 16.425 17.9419 12.7 17.9419H12.5917C9.24169 17.9419 7.70002 16.7335 7.42502 13.7835" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 10H3.01666" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.875 7.20868L2.08333 10.0003L4.875 12.792" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
