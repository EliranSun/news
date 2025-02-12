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
                src="https://media.tenor.com/A5RlBmmGOSQAAAAM/flosktchs-toilet-paper.gif"
            />
            <LoaderImage
                className="hidden dark:block"
                src="https://media.tenor.com/A5RlBmmGOSQAAAAM/flosktchs-toilet-paper.gif"
            />
        </div>
    );
};
