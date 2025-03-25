import { Button, PrimaryLink } from "@/components/shared/NavLink"

const page = async({params,}: {params: Promise<{ slug: string }>}) => {
    const { slug } = await params
    const explanationHeaderStyles = 'text-black text-[1.2vw] font-semibold'
    const explanationBodyStyles = 'text-gray-400 text-[1vw] font-medium'
  return (
    <div className="my-5 mx-11">
      <header className="font-man-rope text-[1.2vw] text-[rgba(51,51,51,0.60)] flex gap-4 mb-6">
        <p>User List</p>
        <p className="text-[#858585] font-medium">&gt;</p>
        <p className="font-medium text-[rgba(51,51,51,0.80)]">Paul Ashiwaju</p>
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
                        Paul Ashiwaju
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Email Address
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        talktoasuquo@gmail.com
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Phone Number
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        12345-12345-1234
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
                    <p className={`${explanationBodyStyles} text-green-400`}>
                        Active
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Date Joined
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        12/12/2024
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Account Tier
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        Tier 1
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
                        Pending Approval
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Document Uploaded
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        driverslicense.pdf
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        KYC Status
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        Not Verified
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
                        $32,000
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Total Withdrawals
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                       $48,000
                    </p>
                </div>
                <div>
                    <h2 className={`${explanationHeaderStyles}`}>
                        Total Deposit
                    </h2>
                    <p className={`${explanationBodyStyles}`}>
                        #34,221
                    </p>
                </div>
            </section>
        </ExplanationItems>
        <div className="flex items-center justify-end py-6">
            <Button text="Suspend User" className="max-w-[180px]" />
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