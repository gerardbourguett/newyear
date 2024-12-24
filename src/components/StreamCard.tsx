import React, { FC } from "react";

type StreamCardProps = {
  title: string;
  country: string;
  link: string;
};

const StreamCard: FC<StreamCardProps> = ({ title, country, link }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{country}</p>
      <iframe
        width="560"
        height="315"
        src={link}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

export default StreamCard;
