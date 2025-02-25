import { Calendar } from "lucide-react";
import { formatDueDate } from "../utils/utils";

export const DueBadge = ({
  data,
  isDone,
}: {
  data: string;
  isDone: boolean;
}) => {
  const date = formatDueDate(data);
  return (
    <div
      className={`flex cursor-default select-none items-center mt-4 ${
        isDone && "bg-neutral-400 border-neutral-400 text-neutral-500"
      } text-xs w-fit py-1 px-1.5 gap-2 rounded-md border ${
        date === "Due Today"
          ? "text-red-500 bg-red-500/20"
          : date === "Due Tomorrow"
          ? "text-orange-500 bg-orange-500/20"
          : "text-neutral-500 bg-neutral-500/20"
      }`}
    >
      <Calendar size={16} />
      <span className="font-medium">{date}</span>
    </div>
  );
};
