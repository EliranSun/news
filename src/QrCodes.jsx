import { QRCode } from "react-qrcode-logo";

const QrCodes = () => {
	const baseUrl = "t.ly/LF8kN";

	return (
		<div
			style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
			{[...Array(20)].map((_, index) => (
				<div
					key={index}
					style={{ margin: "20px" }}>
					<QRCode
						value={`${baseUrl}?image_id=${index + 1}`}
						size={50}
						qrStyle="sqare"
						eyeRadius={5}
					/>
				</div>
			))}
		</div>
	);
};

export default QrCodes;
