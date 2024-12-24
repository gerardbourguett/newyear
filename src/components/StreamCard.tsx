import React, { FC } from "react";

type StreamCardProps = {
  title: string;
  country: string;
  link: string;
};

const StreamCard: FC<StreamCardProps> = ({ title, country, link }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border-red-500">
      <h2 className="text-xl font-semibold text-white mb-2">{country}</h2>
      <p className="text-gray-400 mb-4">{title}</p>
      <iframe
        width="100%"
        height="315"
        src={link}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-lg"
        sandbox=""
      ></iframe>
    </div>
  );
};

export default StreamCard;
