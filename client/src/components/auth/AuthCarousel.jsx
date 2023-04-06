const AuthCarousel = ({ img, title, desc }) => {
  return (
    <div className="!flex flex-col items-center justify-center mb-20">
      <img src={img} alt="" className="w-[500px] mb-20" />
      <h3 className="text-4xl text-white text-center font-bold">{title}</h3>
      <p className="mt-5 text-2xl text-white text-center">{desc}</p>
    </div>
  );
};

export default AuthCarousel;
