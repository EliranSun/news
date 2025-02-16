// import darkLoader from '../../assets/loader-dark.gif';

const DARK_MODE_IMAGE = "https://media.tenor.com/A5RlBmmGOSQAAAAM/flosktchs-toilet-paper.gif";
const LIGHT_MODE_IMAGE = "https://cdn.dribbble.com/users/4072391/screenshots/19660250/media/d31593551e019ea191d9cd69cc542792.gif";

const LoaderImage = ({ src, className }) => {
    return (
        <img
            src={src}
            alt="loading"
            className={`w-1/2 object-cover block mx-auto filter grayscale ${className}`}
        />
    );
};

export const Loader = () => {
    return (
        <div className="h-dvh w-full flex items-center justify-center">
            <LoaderImage
                className="dark:hidden"
                src={LIGHT_MODE_IMAGE}
            />
            <LoaderImage
                className="hidden dark:block"
                src={DARK_MODE_IMAGE}
            />
        </div>
    );
};
