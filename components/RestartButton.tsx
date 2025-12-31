import React from 'react';
import { IoReloadCircleSharp } from "react-icons/io5";

interface RestartButtonProps {
  onClick: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-5 flex justify-end w-full">
      <IoReloadCircleSharp onClick={onClick} className="text-3xl cursor-pointer" />
    </div>
  );
};

export default RestartButton;
