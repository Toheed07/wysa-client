import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
    const notify = () => toast.info("Please login to continue",{
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    const token = localStorage.getItem("token");
    if (!token) {
        // user is not authenticated
        notify()
        return <Navigate to="/login" />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};