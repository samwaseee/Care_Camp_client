import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaXTwitter } from "react-icons/fa6";
import Swal from "sweetalert2";


const SocialSignIn = () => {
    const { GoogleLogin, TwitterLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = () => {
        GoogleLogin()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                .then(() => {
                    //const user = result.user;
                    // console.log(user);
                    Swal.fire({
                        title: 'User Signing Successful.',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                    navigate(location?.state ? location.state : '/');
                })
            })
    }

    const handleTwitterLogin = () => {
        TwitterLogin()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                .then(() => {
                    //const user = result.user;
                    // console.log(user);
                    Swal.fire({
                        title: 'User Signing Successful.',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                    navigate(location?.state ? location.state : '/');
                })
            })
    }

    return (
        <div className="px-8 mb-8">
            <div className="divider"></div>
            <div className="space-y-6">
                <button onClick={handleGoogleLogin} className="btn btn-ghost">
                    <FaGoogle size={'40'}/>Sign in with Google
                </button>
                <button onClick={handleTwitterLogin} className="btn btn-ghost">
                    <FaXTwitter size={'40'}/>Sign in with Twitter / X
                </button>
            </div>
        </div>
    );
};

export default SocialSignIn;