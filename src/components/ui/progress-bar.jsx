import React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

export const ProgressBar = ({ label, value, color }) => {
	return (
		<div>
			<div className="flex justify-between mb-1">
				<span className="text-sm font-medium">{label}</span>
				<span className="text-sm font-medium">{value.toFixed(1)}%</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-4">
				<div
					className={cn("h-4 rounded-full", color)}
					style={{ width: `${value}%` }}></div>
			</div>
		</div>
	);
};

ProgressBar.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
};
