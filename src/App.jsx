import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

const RssFeedComponent = () => {
	const [feeds, setFeeds] = useState([]);
	const rssFeedUrls = ["https://www.ynet.co.il/Integration/StoryRss2.xml"];

	useEffect(() => {
		const parser = new XMLParser();

		const fetchAndParseFeeds = async () => {
			try {
				const allFeedsData = await Promise.all(
					rssFeedUrls.map(async (url) => {
						const response = await fetch(url);
						const text = await response.text();
						const result = parser.parse(text);
						return result;
					})
				);

				console.log({ allFeedsData });
				setFeeds(allFeedsData);
			} catch (error) {
				console.error("Error fetching and parsing feeds:", error);
			}
		};

		fetchAndParseFeeds();
	}, []);

	return (
		<div>
			{/* {feeds.map((feed, index) => (
				<div key={index}>
					<h2>{feed.rss.channel.title}</h2>
					<ul>
						{feed.rss.channel.item.map((item, idx) => (
							<li key={idx}>
								<a href={item.link}>{item.title}</a>
							</li>
						))}
					</ul>
				</div>
			))} */}
		</div>
	);
};

export default RssFeedComponent;
