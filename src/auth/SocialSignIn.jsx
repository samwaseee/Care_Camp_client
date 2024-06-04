import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaXTwitter } from "react-icons/fa6";


const SocialSignIn = () => {
    const { GoogleLogin, TwitterLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        GoogleLogin()
            .then(result => {
                console.log(result.user);
                // const userInfo = {
                //     email: result.user?.email,
                //     name: result.user?.displayName
                // }
                // axiosPublic.post('/users', userInfo)
                // .then(res =>{
                //     console.log(res.data);
                //     navigate('/');
                // })
            })
    }

    const handleTwitterLogin = () => {
        TwitterLogin()
            .then(result => {
                console.log(result.user);
                // const userInfo = {
                //     email: result.user?.email,
                //     name: result.user?.displayName
                // }
                // axiosPublic.post('/users', userInfo)
                // .then(res =>{
                //     console.log(res.data);
                //     navigate('/');
                // })
            })
    }

    return (
        <div className="px-8 mb-8">
            <div className="divider"></div>
            <div className="space-x-10 flex justify-center">
                <button onClick={handleGoogleLogin} className="btn btn-ghost">
                    <FaGoogle className="mr-2" size={'40'}></FaGoogle>
                </button>
                <button onClick={handleTwitterLogin} className="btn btn-ghost">
                    <FaXTwitter size={'40'}/>
                </button>
            </div>
        </div>
    );
};

export default SocialSignIn;