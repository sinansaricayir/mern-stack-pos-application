import { Button, Form, Input, Carousel, Checkbox } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Login = () => {
  const onChange = (e) => {
    // console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:w-2/6 min-w-[400px] xl:px-20 px-10 flex flex-col justify-center w-full relative">
          <h1 className="text-center text-5xl font-bold mb-6">
            <Link to="/">LOGO</Link>
          </h1>
          <Form layout="vertical">
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
                <Checkbox onChange={onChange}>Beni Hatırla</Checkbox>
                <Link to={"/login"}>Şifreyi Unuttum!</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full"
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
