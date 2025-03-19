import Image from "next/image"

const Keyinsight = () => {
  return (
    <div className="p-6 rounded-[20px] bg-white font-man-rope">
        <header className="mb-6 text-black font-semibold text-[1.25vw]">
            Key Insights
        </header>
        <div>
            <p className="mb-5 font-medium text-xs text-gray-400">This month’s metrics</p>
            <div className="flex justify-between items-center w-[90%]">
                <Metric image="/dashboard/insight/totalTrx.svg" title="Total Transactions" value="$1,900,774.00" />
                <Metric image="/dashboard/insight/activeTrade.svg" title="Active Trades" value="14" />
                <Metric image="/dashboard/insight/newUser.svg" title="New User Registration" value="7,621" />
                <Metric image="/dashboard/insight/totalUsers.svg" title="Total Users" value="11,213" />
            </div>
        </div>
    </div>
  )
}

export default Keyinsight

const Metric = ({image, title, value,unit} : {image : string, title : string, value : string, unit ?: string})=>{
    return(<div className="font-man-rope flex items-center gap-3">
        <Image src={image} alt="" width={40} height={40}/>
        <div>
            <h6 className="text-xs text-gray-400 mb-1">{title}</h6>
            <p className="text-lg text-black font-semibold">{unit}{value}</p>
        </div>
    </div>)
}
