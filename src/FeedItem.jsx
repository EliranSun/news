import classNames from "classnames";
import PropTypes from "prop-types";

export const FeedItem = ({ item, onClick, queryResult, onlyTitle }) => {
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
						className={classNames({
							"text-2xl": onlyTitle,
							"text-4xl": !onlyTitle,
							"h-18 font-bold mb-3 w-full": true,
							"merriweather-bold": item.language.includes("en"),
							"heebo-900": !item.language.includes("en"),
						})}>
						{item.title}
					</h1>
					{onlyTitle ? null : (
						<p
							dir={item.language === "he" ? "rtl" : "ltr"}
							className="text-base mb-3">
							{queryResult || item.description}
						</p>
					)}
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

FeedItem.propTypes = {
	onClick: PropTypes.func.isRequired,
	queryResult: PropTypes.string,
	onlyTitle: PropTypes.bool,
	item: PropTypes.shape({
		language: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		diff: PropTypes.shape({
			value: PropTypes.number.isRequired,
			unit: PropTypes.string.isRequired,
		}).isRequired,
		isSaved: PropTypes.bool.isRequired,
	}).isRequired,
};
