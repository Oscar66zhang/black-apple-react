import React, { useEffect, useState } from "react";

type TextHeaderProps = { title: string; subTitle: string };
const TextHeader: React.FC<TextHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="flex justify-between items-center px-4 md:px-16 py-2 md:py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
      <h2 className="text-xl md:text-2xl font-extrabold">{subTitle}</h2>
    </div>
  );
};

export default TextHeader;
