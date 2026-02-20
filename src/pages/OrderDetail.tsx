import { useParams } from "react-router-dom";
import SquareInput from "../components/SquareInput";
import useApiData from "@/hooks/useApiData";
import { Skeleton } from "../components/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../redux/store";
import { useEffect } from "react";

type OrderDetailParams = {
  id: string;
};

const getStatusMessage = (state: string) => {
  switch (state) {
    case "Completed":
      return "下单成功";
    case "Processing":
      return "订单处理中";
    case "Declined":
      return "支付失败";
    case "Cancelled":
      return "订单取消";
    case "Refund":
      return "订单退款";
    default:
      return "未知状态";
  }
};

const OrderDetail = () => {
  const { id } = useParams<OrderDetailParams>();
  if (id == null) {
    throw new Error("order not found");
  }

  const { token } = useSelector((s: RootState) => s.user);

  const { data, loading, error, fetchData } = useApiData<any>(
    `http://localhost:5293/api/orders/${id}`,
    {
      method: "GET",
      autoFetch: false,
    }
  );

  useEffect(() => {
    if (token) {
      fetchData({
        overrideHeaders: { Authorization: `Bearer ${token}` },
      });
    }
  }, [token]);

  if (loading || !data) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen pt-6 p-4">
      <p className="text-4xl mt-2">{getStatusMessage(data.state)}</p>
      <div className="flex flex-col gap-6 mt-12">
        {error ? (
          <p className="text-2xl">订单错误：{error}</p>
        ) : (
          <>
            <p className="text-2xl">订单详情：</p>
            <SquareInput
              subTitle="订单 ID"
              title={id}
              value=""
              onChange={() => {}}
            />
            <SquareInput
              subTitle="订单状态"
              title={data.state}
              value=""
              onChange={() => {}}
            />
            <SquareInput
              value=""
              onChange={() => {}}
              subTitle="下单时间"
              title="2025-09-13T07:29:50.325127Z"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
