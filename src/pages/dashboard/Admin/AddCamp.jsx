import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useForm, useFieldArray } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AddCamp = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, control, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const [dateTime, setDateTime] = useState(null);
    const [regdateTime, setRegDateTime] = useState(null);

    const { fields: servicesFields, append: appendService } = useFieldArray({
        control,
        name: 'servicesOffered'
    });

    const { fields: sponsorsFields, append: appendSponsor } = useFieldArray({
        control,
        name: 'sponsors'
    });

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

    const onSubmit = async (data) => {
        console.log('Form Data:', data);

        try {
            const imageFile = new FormData();
            imageFile.append('image', data.photo[0]);
            const res = await axiosPublic.post(image_hosting_api, imageFile);

            if (res.data.success) {
                console.log('Image URL:', res.data.data.display_url);

                // Rest of the code to handle camp submission...
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
    };

    // const onSubmit = async (data) => {

    //     // try {
    //     //     const imageFile = new FormData();
    //     //     imageFile.append('image', data.photo[0]);
    //     //     const res = await axiosPublic.post(image_hosting_api, imageFile);

    //     //     if (res.data.success) {
    //     //         const newCamp = {
    //     //             ...data,
    //     //             image: res.data.data.display_url,
    //     //             dateTime: dateTime.format('dddd, MMMM Do YYYY, h:mm:ss a'),
    //     //             registrationDeadline: regdateTime.format('dddd, MMMM Do YYYY, h:mm:ss a'),
    //     //             contactInformation: {
    //     //                 phone: data.user_name,
    //     //                 email: user?.email,
    //     //                 address: data.user_location
    //     //             }
    //     //         };

    //     //         // const campRes = await axiosSecure.post('/touristSpot', newCamp);

    //     //         // if (campRes.data.insertedId) {
    //     //         //     Swal.fire({
    //     //         //         position: 'top-end',
    //     //         //         icon: 'success',
    //     //         //         title: `${data.campName} has been added successfully!`,
    //     //         //         showConfirmButton: false,
    //     //         //         timer: 1500
    //     //         //     });

    //     //         //     reset();
    //     //         //     navigate('/dashboard/manageCamps');
    //     //         // }
    //     //     }
    //     // } catch (error) {
    //     //     console.error('Error adding camp:', error);
    //     //     Swal.fire({
    //     //         position: 'top-end',
    //     //         icon: 'error',
    //     //         title: 'An error occurred while adding the camp.',
    //     //         showConfirmButton: false,
    //     //         timer: 1500
    //     //     });
    //     // }
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-32 mx-auto text-black">
            <h3
                className="text-6xl text-neutral-50 font-taj text-white text-center font-bold mb-20 p-20"
                style={{
                    background: `linear-gradient(90deg, #162b32b2, #162b329b), url('https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2021-07/49704086932_7ff0c24724_o_jpg%201280x500.jpg?itok=6gaFuqxG')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPositionY: 'center',
                }}
            >
                Add Camp to Organize
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
                <label className="form-control w-full col-span-2">
                    <label className="label">
                        <span className="label-text">Organizer mail</span>
                    </label>
                    <input
                        type="email"
                        placeholder={user?.email} disabled
                        {...register('contactInformation.email', { required: true })}
                        className=" input-bordered w-full text-2xl font-taj font-bold"
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Camp Name</span>
                    </div>
                    <input
                        type="text"
                        name="campName"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        {...register('campName', { required: true })}
                    />
                </label>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Phone*</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        {...register('contactInformation.phone', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter address"
                        {...register('contactInformation.address', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Fee</span>
                    </div>
                    <input
                        type="text"
                        name="fees"
                        placeholder="Write free if it's free"
                        className="input input-bordered w-full"
                        {...register('fees', { required: true })}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Location</span>
                    </div>
                    <input
                        type="text"
                        name="location"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        {...register('location', { required: true })}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Camp Date</span>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={dateTime}
                            onChange={newValue => setDateTime(newValue)}
                            renderInput={(params) => <input required {...params} className="input input-bordered w-full" />}
                        />
                    </LocalizationProvider>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Registration Deadline</span>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={regdateTime}
                            onChange={newValue => setRegDateTime(newValue)}
                            renderInput={(params) => <input required {...params} className="input input-bordered w-full" />}
                        />
                    </LocalizationProvider>
                </label>
                <label className="form-control w-full md:col-span-2">
                    <div className="label">
                        <span className="label-text text-white">Camp Description</span>
                    </div>
                    <textarea
                        className="textarea textarea-bordered w-full h-full"
                        name="short_description"
                        placeholder="Write a short description about the camp you are going to organize"
                        {...register('short_description', { required: true })}
                    ></textarea>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Healthcare Professional</span>
                    </div>
                    <input
                        type="text"
                        name="healthcareProfessional_name"
                        placeholder="Name"
                        className="input input-bordered w-full mb-2"
                        {...register('healthcareProfessional.name', { required: true })}
                    />
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="healthcareProfessional_specialization"
                            placeholder="Specialization"
                            className="input input-bordered w-full"
                            {...register('healthcareProfessional.specialization', { required: true })}
                        />
                        <input
                            type="text"
                            name="healthcareProfessional_experience"
                            placeholder="Experience in Years"
                            className="input input-bordered w-full"
                            {...register('healthcareProfessional.experience', { required: true })}
                        />
                    </div>
                    <textarea
                        className="textarea textarea-bordered w-full h-full mt-2"
                        name="healthcareProfessional_bio"
                        placeholder="Bio"
                        {...register('healthcareProfessional.bio', { required: true })}
                    ></textarea>
                </label>
                <label className="form-control md:col-span-2 w-full">
                    <div className="label">
                        <span className="label-text text-white">Services Offered</span>
                    </div>
                    {servicesFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <input
                                type="text"
                                name={`servicesOffered[${index}].name`}
                                placeholder="Service Name"
                                className="input input-bordered w-full"
                                {...register(`servicesOffered.${index}.name`, { required: true })}
                            />
                            <textarea
                                className="textarea textarea-bordered w-full h-full"
                                name={`servicesOffered[${index}].description`}
                                placeholder="Service Description"
                                {...register(`servicesOffered.${index}.description`, { required: true })}
                            ></textarea>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-outline btn-success btn-sm mt-3"
                        onClick={() => appendService({ name: '', description: '' })}
                    >
                        <FiPlus /> Add Service
                    </button>
                </label>
                <label className="form-control md:col-span-2 w-full">
                    <div className="label">
                        <span className="label-text text-white">Sponsors</span>
                    </div>
                    {sponsorsFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <input
                                type="text"
                                name={`sponsors[${index}].name`}
                                placeholder="Sponsor Name"
                                className="input input-bordered w-full"
                                {...register(`sponsors.${index}.name`, { required: true })}
                            />
                            <textarea
                                className="textarea textarea-bordered w-full h-full"
                                name={`sponsors[${index}].description`}
                                placeholder="Sponsor Description"
                                {...register(`sponsors.${index}.description`, { required: true })}
                            ></textarea>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-outline btn-success btn-sm mt-3"
                        onClick={() => appendSponsor({ name: '', description: '' })}
                    >
                        <FiPlus /> Add Sponsor
                    </button>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Upload Camp Image</span>
                    </div>
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register('photo', { required: true })}
                    />
                </label>
            </div>
            <input className="btn btn-primary mt-4 btn-block" type="submit" value="Add Camp" />
        </form>
    );
};

export default AddCamp;
