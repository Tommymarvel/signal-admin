import Keyinsight from "@/components/dashboard/Keyinsight";
import TradeVolumeChart from "@/components/dashboard/TradeVolume";

export default function Home() {
  return (<div className="my-5 mx-11">
    <Keyinsight/>
    <TradeVolumeChart/>
  </div>);
}
