import React from "react";

interface EventTooltipProps {
  title: string;
  description?: string;
  start: number;
  end: number;
}

const EventTooltip: React.FC<EventTooltipProps> = ({
  title,
  description,
  start,
  end,
}) => {
  return (
    <div
      className="
        absolute z-50 hidden group-hover:block
        bg-gray-800 text-white text-xs rounded
        px-2 py-1 top-5 left-0 w-max max-w-[180px]
        shadow-lg transition-opacity duration-150 ease-in-out
      "
    >
      <div className="font-semibold">{title}</div>
      <div className="text-gray-200">
        {description || "일정 내용이 없습니다."}
      </div>
      <div className="text-gray-300 text-[10px] mt-1">
        {`${start}일 ~ ${end}일`}
      </div>
    </div>
  );
};

export default EventTooltip;