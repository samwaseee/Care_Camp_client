import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AddCamp = () => {


    const { user } = useAuth();
    const navigate = useNavigate();
    // console.log(user);


    const handleAddTouristSpot = e => {
        e.preventDefault();

        const form = e.target;

        const user_name = form.user_name.value;
        const user_email = form.user_email.value;
        const tourists_spot_name = form.tourists_spot_name.value;
        const country_Name = countryRef.current.value;
        const location = form.location.value;
        const short_description = form.short_description.value;
        const average_cost = form.average_cost.value;
        const seasonality = form.seasonality.value;
        const travel_time = form.travel_time.value;
        const totalVisitorsPerYear = form.totalVisitorsPerYear.value;
        const image = form.photo.value;

        const newSpot = { average_cost, country_Name, travel_time, image, location, seasonality, short_description, totalVisitorsPerYear, tourists_spot_name, user_email, user_name }

        // console.log(form.country_Name);

        fetch('/touristSpot', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(newSpot)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success",
                        text: "New Tourist Spot Added Successfully!",
                        icon: "success"
                    });
                }
                form.reset();
                navigate('/dashboard/manageCamps');
            })

    }


    return (
        <form onSubmit={handleAddTouristSpot} className='px-32 mx-auto text-black' >
            <h3 className='text-6xl text-neutral-50 font-taj text-white text-center font-bold mb-20 p-20' style={{ background: `linear-gradient(90deg, #162b32b2, #162b329b), url('https://www.ifrc.org/sites/default/files/styles/hero_image_desktop_1280_x_600_/public/2021-07/49704086932_7ff0c24724_o_jpg%201280x500.jpg?itok=6gaFuqxG')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionY: 'center' }}>Add Camp to Organize</h3>
            <div className='grid md:grid-cols-3 gap-3'>
                <label className="form-control w-full md:col-span-2 flex">
                    <div className="label">
                        <span className="label-text text-white">Organizer Email</span>
                    </div>
                    <input type="email" name='user_email' defaultValue={user?.email} placeholder="Type here" className="input input-bordered text-xl font-bold font-playfair w-full " disabled />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-white">Camp Name</span>
                    </div>
                    <input type="text" name='campName' placeholder="Type here" className="input input-bordered w-full " />
                </label>
                <label className="form-control md:col-span-2 w-full ">
                    <div className="label">
                        <span className="label-text text-white">Organizer Name</span>
                    </div>
                    <input type="text" name='user_name' defaultValue={user?.displayName} placeholder="Type here" className="input input-bordered text-xl font-bold font-playfair w-full " disabled />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-white">Fee</span>
                    </div>
                    <input type="text" name='fees' placeholder="Write free if it's free" className="input input-bordered w-full " />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-white">Location</span>
                    </div>
                    <input type="text" name='location' placeholder="Type here" className="input input-bordered w-full " />
                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-white">Camp Date</span>
                    </div>
                    <input type="date" name='seasonality' placeholder="Ex. Summer / Winter" className="input input-bordered w-full " />
                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-white">Time</span>
                    </div>
                    <input type="number" name='travel_time' placeholder="Ex. 7 days" className="input input-bordered w-full " />
                </label>
                <label className="form-control w-full md:col-span-2 row-span-2">
                    <div className="label">
                        <span className="label-text text-white">Short Description</span>
                    </div>
                    <textarea className="textarea textarea-bordered w-full h-full" name='short_description' placeholder="Write a short description about the tourist spot here."></textarea>
                    {/* <input type="text" name='shortDescription' placeholder="Type here" className="textarea textarea-bordered text-start w-full h-full" /> */}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-white">Total Visitor Per Year</span>
                    </div>
                    <input type="number" name='totalVisitorsPerYear' placeholder="Ex. 1000 " className="input input-bordered w-full " />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text text-white">Average Cost</span>
                    </div>
                    <input type="number" name='average_cost' placeholder="Type here" className="input input-bordered w-full " />
                </label>


                <label className="form-control md:col-span-3 w-full mx-auto">
                    <div className="label">
                        <span className="label-text text-white">Photo URL</span>
                    </div>
                    <input type="URL" name='photo' placeholder="Use image URL" className="input input-bordered " />
                </label>
                <input type="submit" value="ADD TOURIST SPOT" className='btn btn-ghost text-white font-bold text-xl bg-[#ff4838] md:col-span-3 mt-7' />
            </div>
        </form>
    );
};

export default AddCamp;