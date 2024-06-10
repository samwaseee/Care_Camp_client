import { Link, useRouteError } from "react-router-dom";
import GifPlayer from 'react-gif-player';

const Error = () => {

    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="text-center space-y-14 items-center h-[10vh]">
            {/* <h1 className="text-6xl">Oops! <br />{error.status} {error.statusText}</h1>
            <img src="../../../public/5-stars.png" alt="" className="w-64 mx-auto"/>
            <p className="text-4xl">Sorry, an unexpected error has occurred.</p>
            <p className="text-2xl font-mar">
                <i>{error.error.message}</i>
            </p> */}
            <GifPlayer gif="https://cdn.dribbble.com/users/2771385/screenshots/16267270/downloads/Comp%202-min.gif"
                autoplay={true}
                loop={true}
                style={{ height: "100vh", width: "100vw" }} />
            <div className="absolute top-0 left-[36%] text-white">
                <p className="text-4xl mb-14">
                    <i>{error.error.message}</i>
                </p>
                <Link to={'/'} ><button className="btn px-20">Go Back</button></Link>
            </div>
        </div>
    );
};

export default Error;