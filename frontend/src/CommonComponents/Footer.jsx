import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { TiSocialFacebook } from "react-icons/ti";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sectionContainer container grid">
        <div className="gridOne">
          <div className="logoDiv">
            <img
              src="assets/QAirlineNewLogo.png"
              alt=""
              className="logoFooter"
            />
          </div>
          <p>Tâm trí của bạn phải mạnh mẽ hơn cảm xúc, bay đi!</p>
          <div className="socialIcon flex">
            <TiSocialFacebook className="icon" />
            <AiOutlineTwitter className="icon" />
            <AiFillYoutube className="icon" />
          </div>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">Thông tin</span>
          <li>
            <a href="">Trang chủ</a>
          </li>
          <li>
            <a href="">Khám phá</a>
          </li>
          <li>
            <a href="">Tình trạng chuyến bay</a>
          </li>
          <li>
            <a href="">Du lịch</a>
          </li>
          <li>
            <a href="">Làm thủ tục</a>
          </li>
          <li>
            <a href="">Quản lý đặt vé</a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">Hướng dẫn nhanh</span>
          <li>
            <a href="">Câu hỏi thường gặp (FAQ)</a>
          </li>
          <li>
            <a href="">Hướng dẫn sử dụng</a>
          </li>
          <li>
            <a href="">Tính năng</a>
          </li>
          <li>
            <a href="">Hành lý</a>
          </li>
          <li>
            <a href="">Bản đồ tuyến đường</a>
          </li>
          <li>
            <a href="">Cộng đồng của chúng tôi</a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">Thông tin khác</span>
          <li>
            <a href="">Tài xế</a>
          </li>
          <li>
            <a href="">Đối tác của chúng tôi</a>
          </li>
          <li>
            <a href="">Điểm đến</a>
          </li>
          <li>
            <a href="">Cơ hội nghề nghiệp</a>
          </li>
          <li>
            <a href="">Vận chuyển</a>
          </li>
          <li>
            <a href="">Chương trình</a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Footer;
