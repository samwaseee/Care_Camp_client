import { useState } from 'react';
import { updateProfile } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
    const { user } = useAuth();
    const [newName, setNewName] = useState('');
    const [newPhotoURL, setNewPhotoURL] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                await updateProfile(user, {
                    displayName: newName,
                    photoURL: newPhotoURL,
                });
                // console.log('User profile updated successfully');
            } catch (error) {
                console.error('Error updating user profile:', error);
            }
        }
    };

    const handleSave = () => {
        if (user) {
            updateProfile(user, {
                displayName: newName,
                photoURL: newPhotoURL,
            })
                .then(() => {
                    Swal.fire({
                        title: 'Profile update Successful.',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                    navigate(location?.state ? location.state : '/');
                    // console.log('User profile updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating user profile:', error);
                });
        }
    };

    return (
        <div className="hero">
            <Helmet>
                <title>Care Camp | Update Profile</title>
            </Helmet>
            <div className="">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold my-6">Update your profile</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
                    <form className="card-body" onSubmit={handleUpdate}>
                        <img src={user?.photoURL} alt="No image" className='text-center rounded-3xl' />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text my-4">Email : {user?.email}</span>
                            </label>
                            <label className="label">
                                <span className="label-text mb-4">Current Name : {user?.displayName}</span>
                            </label>
                            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input type="link" value={newPhotoURL} onChange={(e) => setNewPhotoURL(e.target.value)} placeholder="New PhotoURL" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={handleSave} className="btn btn-outline">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;