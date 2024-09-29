export const Loader = () => {
	return (
		<div className="h-dvh w-full flex items-center justify-center">
			<img
				alt="loading"
				src="https://cdn.dribbble.com/users/4072391/screenshots/19660250/media/d31593551e019ea191d9cd69cc542792.gif"
				style={{
					width: "50%",
					objectFit: "cover",
					display: "block",
					margin: "0 auto",
					filter: "grayscale(1)",
				}}
			/>
		</div>
	);
};
