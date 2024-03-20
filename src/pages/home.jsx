import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const notify = () =>
    toast.info("Logout Successfully!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleLogout = () => {
    localStorage.removeItem("token");
    notify();
    navigate("/login");
  };
  return (
    <div >
      <div className="flex justify-center" style={{
          background:
            "linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)",
            minHeight: "100vh"
        }}>
        <Link to="/login" className="inline-block m-6">
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-lg">
            Login
          </button>
        </Link>
        <Link to="/chat" className="inline-block m-6">
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-lg">
            Chat
          </button>
        </Link>
        <div className="inline-block m-6">
        <button
          onClick={() => handleLogout()}
          className="bg-blue-500  text-white rounded-md px-4 py-2 text-lg"
        >
          Logout
        </button>
        </div>
      
      </div>
    </div>
  );
};

export default Home;
