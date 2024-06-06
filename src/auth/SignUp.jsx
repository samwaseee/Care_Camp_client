import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;


    const onSubmit = async (data) => {

        try {
            const imageFile = new FormData();
            imageFile.append('image', data.photo[0]);
            const res = await axiosPublic.post(image_hosting_api, imageFile);

            if (res.data.success) {
                const img = res.data.data.display_url;


                createUser(data.email, data.password)
                    .then(result => {
                        const loggedUser = result.user;
                        console.log(loggedUser);
                        updateUserProfile(data.name, img)
                            .then(() => {
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    
                                }
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            console.log('user added to the database')
                                            reset();
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'User created successfully.',
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate(location?.state ? location.state : '/');
                                        }
                                    })


                            })
                            .catch(error => console.log(error))
                    })
            }


        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'An error occurred while uploading the image.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

        return (
            <>
                <Helmet>
                    <title>Bistro Boss | Sign Up</title>
                </Helmet>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Sign up now!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text text-white">Photo</span>
                                        </div>
                                        <input required
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            className="file-input file-input-bordered w-full"
                                            {...register('photo', { required: true })}
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        lowercase: /(?=.*[a-z])/,
                                        uppercase: /(?=.*[A-Z])/,
                                        specialcase: /(?=.*[!@#$&*])/,
                                        numbercase: /(?=.*[0-9])/
                                    })} placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'uppercase' && <p className="text-red-600">Password must have one Uppercase character.</p>}
                                    {errors.password?.type === 'lowercase' && <p className="text-red-600">Password must have one lower case character.</p>}
                                    {errors.password?.type === 'specialcase' && <p className="text-red-600">Password must have special character.</p>}
                                    {errors.password?.type === 'numbercase' && <p className="text-red-600">Password must have one number.</p>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                                </div>
                            </form>
                            <p className="mx-auto pb-4"><small>Already have an account <Link to="/login"> <strong>Login</strong> </Link></small></p>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    export default SignUp;