import { useContext, useState, useEffect } from "react";
import SquareInput from "@/components/SquareInput";
import PaymentSelector from "@/components/PaymentSelector";
import { SiAlipay, SiWechat } from "react-icons/si";
import { Button } from "@/components";
import useApiData from "@/hooks/useApiData";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Order } from "@/types/custom";
import { ShoppingCartContext } from "@/contexts/shoppingCart";

const CheckOut = () => {
  const { clearCart } = useContext(ShoppingCartContext);

  const { token } = useSelector((s: RootState) => s.user);

  const { data, loading, error, fetchData } = useApiData<Order>(
    "http://152.136.182.210:12231/api/orders/place",
    {
      method: "POST",
      autoFetch: false,
    },
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleSubmit = async () => {
    if (!name || !address || !phoneNumber || !selectedPayment) {
      alert("请填写完整信息");
      return;
    }
    const body = {
      name,
      address,
      extraAddress,
      selectedPayment,
    };
    try {
      await fetchData({
        overrideBody: body,
        overrideHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("返回数据:", data);
      alert("订单已提交");
    } catch (err) {
      console.log(err);
      alert("订单提交失败");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (error) alert(error);
    if (data) {
      //清空购物车
      clearCart();
      const { id, paymentUri } = data;
      window.location.href = `${paymentUri}?orderId=${id}&redirect=http://152.136.182.210:12231/api/orders/${id}`;
    }
  }, [data, loading, error]);

  return (
    <div className="min-h-screen pt-6 p-4">
      <p className="text-4xl mt-4">你的送货地址是哪里？</p>
      <div className="flex flex-col gap-6 mt-12">
        <p className="text-2xl">输入收件人姓名和地址:</p>
        {/* 用户名 */}
        <SquareInput
          subTitle="用户名"
          title="请输入用户名"
          value={name}
          onChange={setName}
        />
        {/* 地址 */}
        <SquareInput
          subTitle="地址"
          title="请输入地址"
          value={address}
          onChange={setAddress}
        />
        {/* 额外地址 */}
        <SquareInput
          subTitle="额外地址"
          title="请输入额外地址"
          value={extraAddress}
          onChange={setExtraAddress}
        />
        <p className="text-2xl">你的联系方式是什么?</p>
        {/* 手机号 */}
        <SquareInput
          subTitle="手机号"
          title="请输入收件人的电话号码"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </div>
      <p className="text-3xl mt-6">选择你的支付方式:</p>
      <div className="flex flex-col gap-6 mt-6">
        <PaymentSelector
          name="支付宝"
          icon={<SiAlipay className="w-6 h-6 text-blue-500" />}
          isSelected={selectedPayment === "支付宝"}
          onClick={() => setSelectedPayment("支付宝")}
        />
        <PaymentSelector
          name="微信支付"
          icon={<SiWechat className="w-6 h-6 text-green-500" />}
          isSelected={selectedPayment === "微信支付"}
          onClick={() => setSelectedPayment("微信支付")}
        />
      </div>
      <div className="flex justify-end mt-12 mr-4">
        <Button title="下单" onClick={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CheckOut;
