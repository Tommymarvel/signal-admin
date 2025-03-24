import TradeInsight from '@/components/tradeManagement/TradeInsights';
import TradeTable from '@/components/tradeManagement/TradeTable';

const page = () => {
  return (
    <div className="my-5 mx-11">
      <TradeInsight />
      <div className="mt-5">
        {' '}
        <TradeTable />
      </div>
    </div>
  );
};

export default page;
