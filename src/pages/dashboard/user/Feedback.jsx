import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";

const Feedback = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    // console.log(id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        const newfeedback = {
            participant: user?.displayName,
            participantImage: user?.photoURL,
            participantMail: user?.email,
            dateTime: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
            feedback: data.description,
            campName: id
        };

        console.log(newfeedback)

        try {
            const res = await axiosSecure.post('/feedbacks', newfeedback);
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Feedback on ${newfeedback.campName} has been saved!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate('/dashboard/registeredCamps');
            }
        } catch (error) {
            console.log( error);
        }
    }

    // console.log(watch("example"))


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 mx-auto">
                <label className="form-control w-full md:col-span-2">
                    <div className="label">
                        <span className="label-text text-white">Camp Description</span>
                    </div>
                    <textarea required
                        className="textarea textarea-bordered w-full h-full"
                        name="short_description"
                        placeholder="Write a short Feedback about the camp you have participated"
                        {...register('description', { required: true })}
                    ></textarea>
                    {errors.exampleRequired && <span>This field is required</span>}
                </label>


                <input className="btn btn-wide" type="submit" />
            </form>
        </div>
    );
};

export default Feedback;