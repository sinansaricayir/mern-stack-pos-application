import { Button, Popconfirm, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  increase,
  decrease,
  reset,
} from "../../redux/cartSlice";

const CartTotals = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-white p-4 font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-16 w-16 object-cover cursor-pointer"
                    onClick={() => dispatch(deleteProduct(item))}
                  />
                  <div className="flex flex-col pl-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold inline-block w-6 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (window.confirm("Ürün Silinsin Mi?")) {
                          dispatch(decrease(item));
                          message.info("Ürün Sepetten Silindi.");
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrease(item));
                      }
                    }}
                  />
                </div>
              </li>
            ))
          : "Sepette ürün yok..."}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-b border-t">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>
              {cart.total.toFixed(2) > 0 ? cart.total.toFixed(2) : 0}₺
            </span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV % {cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2) > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length > 0 ? false : true}
          >
            Sipariş Oluştur
          </Button>

          <Popconfirm
            title="Ürün Silme "
            description="Ürünü silmek istediğinizden emin misiniz ?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => dispatch(reset())}
            className="w-full mt-2 flex items-center justify-center"
          >
            {cart.cartItems.length > 0 ? (
              <Button
                type="primary"
                size="large"
                className="w-full mt-2 flex items-center justify-center"
                icon={<ClearOutlined />}
                danger
                disabled={cart.cartItems.length > 0 ? false : true}
              >
                Temizle
              </Button>
            ) : (
              ""
            )}
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
