import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const ChartCard = ({
	title,
	children,
	className = "",
	onClick = null,
	subtitle = null,
}) => {
	return (
		<Card
			className={`hover:shadow-lg transition-shadow ${
				onClick ? "cursor-pointer" : ""
			} ${className}`}
			onClick={onClick}>
			<CardHeader className="pb-2">
				<CardTitle className="text-xl font-semibold flex flex-col items-center justify-between">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="px-2">{children}</CardContent>
			{subtitle && (
				<span className="text-sm text-muted-foreground">{subtitle}</span>
			)}
		</Card>
	);
};
