import darkLoader from '../../assets/loader-dark.gif';

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
                src="https://cdn.dribbble.com/users/4072391/screenshots/19660250/media/d31593551e019ea191d9cd69cc542792.gif"
            />
            <LoaderImage
                className="hidden dark:block"
                src={darkLoader}
            />
        </div>
    );
};
