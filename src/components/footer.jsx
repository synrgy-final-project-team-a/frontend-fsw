import React from "react";

const FooterComponent = () => {
  return (
    <div className="container ml-99">
      <div className="row">
        <div className="col-md-3 first-footer">
            <img src="/logo-footer.png" alt="..." />
            <p className="kosanku-desc">Kosanku merupakan platform pencari kos yang mudah dan terpercaya, 
              serta platform penyewa kos terbaik. Kosanku berkembang dari tahun ke 
              tahun menjadi lebih mudah dan nyaman bagi penguna baik pencari maupun penyewa kos.
              </p>
        </div>
          <div className="col-md-3 second-footer">
            <p className="footer-title ">Kosanku</p>
            <div className="mt-30 footer-subtitle">
              <p>Pusat Bantuan</p>
              <p>Kebijakan Privasi</p>
              <p>Syarat dan Ketentuan</p>              
            </div>
            
          </div>
          <div className="col-md-3 third-footer">
            <p className="footer-title ">Hubungi Kami</p>
            <div className="mt-30 footer-subtitle">
              <p>kosanku@mail.com</p>
              <p>62+ 897 67675 12128</p>
              <p>infokosan@gmail.com</p>              
            </div>
          </div>
          <div className="col-md-3 fourth-footer">
            <p className="footer-title ">Follow Kami</p>
            <div className="mt-30 footer-subtitle">
              <p>facebook</p>
              <p>instagram</p>
              <p>twitter</p>              
            </div>
          </div>
        
      </div>
      <div className="seperator"></div>
      <div className="copyright">
        kosanku © 2022 All-rights reserved        
      </div>
    </div>
  );
};
export default FooterComponent;
