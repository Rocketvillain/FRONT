import '../../css/component/Footer.css';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* 첫 번째 문구 */}
                <div className="footer-main-message">
                    <a>우리 가족을 위한 최고의 서비스, 강남구 동물병원의 정보를 한 눈에!</a>
                </div>

                <div className="footer-flex">
                    {/* 회사 정보 */}
                    <div className="footer-company-info">
                        <p><strong>상호명:</strong> Healing Pets(힐링)</p>
                        <p><strong>대표자:</strong> 꾸러기로켓단</p>
                        <p><strong>사업자등록번호:</strong> 201-05-12345</p>
                        <p><strong>주소:</strong> 서울특별시 강남구 서초동 1318-2 8층</p>
                    </div>

                    {/* 소셜 미디어 아이콘 */}
                    <div className="footer-social-icons">
                        <a href="https://github.com/Rocketvillain" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/material-outlined/24/ffffff/github.png" alt="GitHub Icon" />
                        </a>
                        <a>
                            <img src="https://img.icons8.com/material-outlined/24/ffffff/facebook.png" alt="Facebook Icon" />
                        </a>
                        <a>
                            <img src="https://img.icons8.com/material-outlined/24/ffffff/twitter.png" alt="Twitter Icon" />
                        </a>
                        <a>
                            <img src="https://img.icons8.com/material-outlined/24/ffffff/instagram-new.png" alt="Instagram Icon" />
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Healing Pets. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
