import resetImg from "./assets/ic-reset.svg";

function ImgButton({ className, onClick }) {
  return <img src={resetImg} className={className} alt='초기화' onClick={onClick}></img>;
}

export default ImgButton;
