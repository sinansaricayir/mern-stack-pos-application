import { Button, Form, Input, Carousel, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        message.success("Giriş işlemi başarılı");
        navigate("/");
        setLoading(false);
        localStorage.setItem(
          "postUser",
          JSON.stringify({
            username: user.userName,
            email: user.email,
          })
        );
      } else if (res.status === 403) {
        message.error("Geçersiz Parola!");
      } else if (res.status === 404) {
        message.error("Kullanıcı Bulunamadı!");
      }

      setLoading(false);
    } catch (error) {
      message.error("Birşeyler yolunda gitmedi!");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:w-2/6 min-w-[400px] xl:px-20 px-10 flex flex-col justify-center w-full relative">
          <h1 className="text-center text-5xl font-bold mb-6">
            <Link to="/">LOGO</Link>
          </h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: false }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link to={"/login"}>Şifreyi Unuttum!</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="absolute bottom-10 left-0 w-full flex items-center justify-center">
            Henüz bir hesabınız yok mu?
            <Link to="/register" className="text-blue-600 inline-block p-2">
              Şimdi kaydol!
            </Link>
          </div>
        </div>
        <div className="sm:flex hidden xl:w-4/6 min-w-[500px] bg-[#6c63ff]">
          <div className="w-full mt-40">
            <Carousel autoplay>
              <AuthCarousel
                img={"images/responsive.svg"}
                title={"Responsive"}
                desc={"Tüm Cihaz Boyutlarıyla Uyumluluk"}
              />
              <AuthCarousel
                img={"images/statistic.svg"}
                title={"İstatistikler"}
                desc={"Geniş Tutulan İstatistikler"}
              />
              <AuthCarousel
                img={"images/customer.svg"}
                title={"Müşteri Memnuniyeti"}
                desc={"Deneyim Sonunda Üründen Memnun Müşteriler"}
              />
              <AuthCarousel
                img={"images/admin.svg"}
                title={"Yönetici Paneli"}
                desc={"Tek Yerden Yönetim"}
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
