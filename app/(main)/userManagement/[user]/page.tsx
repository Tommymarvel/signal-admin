'use client'
import { Button, PrimaryLink } from "@/components/shared/NavLink"
import { axiosGet, axiosPost } from "@/utils/api"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const page = () => {
    const { user } = useParams()
    const [userInfo, setUserInfo] = useState<userDetailProps | any>({} as userDetailProps)
    useEffect(()=>{
        const getUserInfo = async()=>{
            try {
                const res = await axiosGet(`/admin/users?search=${user}`,true)
                console.log(res.users[0])
                setUserInfo(res.users[0])
            } catch (error) {
                toast.error('Unable to fetch user information')
            }
        }
        getUserInfo()
    },[])

    const handleSuspendUser = async(user_id : string|number|undefined)=>{
        try {
          const confirm = window.confirm("Are you sure you want to suspend this user")
    
          if(confirm){
            await axiosPost('/admin/user/ban',{user_id},true)
            toast.success('User Deleted Successfully')
          }
          return;
        } catch (error) {
          console.log(error)
          toast.error('An error occurred while deleting admin')
        }
    }
    const explanationHeaderStyles = 'text-black text-[1.2vw] font-semibold'
    const explanationBodyStyles = 'text-gray-400 text-[1vw] font-medium'
  return (
    <div className="my-5 mx-11">
      <header className="font-man-rope text-[1.2vw] text-[rgba(51,51,51,0.60)] flex gap-4 mb-6">
        <p>User List</p>
        <p className="text-[#858585] font-medium">&gt;</p>
        <p className="font-medium text-[rgba(51,51,51,0.80)]">{userInfo.name || "N/A"}</p>
      </header>
      <main className="space-y-6 w-[80%]">
        <ExplanationItems>
            <header className={`${explanationHeaderStyles} mb-5`}>
                Personal Information
            </header>
            <section className={`flex items-center justify-between`}>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Name
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.name || "N/A"}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Email Address
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.email || "N/A"}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Phone Number
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.phone_number || "N/A"}
                    </p>
                </div>
                
            </section>
        </ExplanationItems>
        <ExplanationItems>
            <header className={`${explanationHeaderStyles} mb-5`}>
                Account Information
            </header>
            <section className={`flex items-center justify-between`}>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Account Status
                    </h2>
                    <p className={`${explanationBodyStyles} ${userInfo.status == 'Inacitve' ? 'text-red-400' :  'text-green-400'} `}>
                     {userInfo.status == 'Inacitve' ? "Inactive" : "Active"}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Date Joined
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.date_joined || "N/A"}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Account Tier
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo['tier'] || "N/A"}
                    </p>
                </div>
            </section>
        </ExplanationItems>
        <ExplanationItems>
            <header className={`${explanationHeaderStyles} mb-5`}>
                KYC Status
            </header>
            <section className={`flex items-center justify-between`}>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Approval Status
                    </h2>
                    <p className={`${explanationBodyStyles} text-[#F3A218]`}>
                        {userInfo.appStatus || "N/A"}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Document Uploaded
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.document  || 'N/A'}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        KYC Status
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.kyc_status || "N/A"}
                    </p>
                </div>
            </section>
        </ExplanationItems>
        <ExplanationItems>
            <header className={`${explanationHeaderStyles} mb-5`}>
                Wallet Information
            </header>
            <section className={`flex items-center justify-between`}>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Current Balance
                    </h2>
                    <p className={`${explanationBodyStyles} text-[#F3A218]`}>
                        {userInfo.current_balance}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Total Withdrawals
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.total_withdrawals}
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Total Deposit
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        {userInfo.total_deposits}
                    </p>
                </div>
            </section>
        </ExplanationItems>
        <div className="flex items-center justify-end py-6">
            <Button onClick={()=>handleSuspendUser(userInfo.id)} text="Suspend User" className="max-w-[180px]" />
        </div>
      </main>
    </div>
  )
}

export default page

const ExplanationItems = ({children}: {children : React.ReactNode})=>{
    return(<div className="p-5 rounded-[20px] bg-white font-man-rope pr-14">
        {children}
    </div>)
}