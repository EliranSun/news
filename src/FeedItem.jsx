export const FeedItem = ({ item, onClick, queryResult }) => {
	return (
		<div
			onClick={onClick}
			className={`
				${item.language.includes("he") ? "text-right" : "text-left"}
				mt-4 flex gap-4 justify-between w-full
			`}>
			<div className="w-full flex flex-col justify-between">
				<div>
					<h1
						dir={item.language === "he" ? "rtl" : "ltr"}
						className="text-3xl h-18 font-bold mb-3 w-full">
						{item.title}
					</h1>
					<p
						dir={item.language === "he" ? "rtl" : "ltr"}
						className="text-base mb-3">
						{queryResult || item.description}
					</p>
				</div>
				<p className="text-sm font-mono">
					{item.diff.value}
					{item.diff.unit} ago
				</p>
				{/* <Buttons
					item={item}
					onQueryClick={() => onQueryClick(question)}
				/> */}
			</div>
		</div>
	);
};
