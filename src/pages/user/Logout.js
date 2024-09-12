//  로그아웃 후 페이지
function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login"; // 로그아웃 후 리다이렉트
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;