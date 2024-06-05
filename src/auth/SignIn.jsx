import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth';
import SocialSignIn from './SocialSignIn';
import { Parallax } from 'react-parallax';

const SignIn = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSignIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    title: 'User SignIn Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    const handleValidateCaptcha = (e) => {
        if (e.key === 'Enter') {
            const user_captcha_value = e.target.value;
            if (validateCaptcha(user_captcha_value)) {
                setDisabled(false);
            } else {
                setDisabled(true);
                e.target.value = ''; // Clear the input field
                loadCaptchaEnginge(6); // Reload the captcha
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | SignIn</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 py-24 w-[100vw">
                <div className="hero-content flex-col md:flex-row gap-72">
                    <div className="bg-neutral-950 bg-opacity-50 w-full absolute">
                        <Parallax
                            blur={{ min: -15, max: 15 }}
                            bgImage={"https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2021-05/p-ITA0199%201280x500.jpg?itok=Drw7U-kO"}
                            strength={500}
                            bgImageStyle={{  height:'650px', objectPosition: 'center' }}
                        >
                            <div className="hero items-center h-96">
                                <div className="hero-overlay bg-opacity-60"></div>
                                <div className="hero-content text-center text-neutral-content">
                                    <div className="max-w-md py-32"></div>
                                </div>
                            </div>
                        </Parallax>
                    </div>
                    <div className='z-10 text-neutral-50'>
                        <h1 className="text-5xl font-bold">Sign In now!</h1>
                        <p className="py-6">Participate in the ever growing healtcare community</p>
                    </div>
                    <div className="card md:w-96 shadow-2xl bg-base-100">
                        <form onSubmit={handleSignIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label grid">
                                    <p className='text-center text-[10px] pb-2'>Human verification . press Enter to Validate</p>
                                    <LoadCanvasTemplate />
                                </label>
                                <input onKeyDown={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="SignIn" />
                            </div>
                        </form>
                        <p className='mx-auto mb-5'><small>New Here? <Link to="/signup" className='font-bold'>Create an account</Link> </small></p>
                        <SocialSignIn></SocialSignIn>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;