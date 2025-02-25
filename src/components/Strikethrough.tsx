import { cn } from "../utils/utils";

type StrikeThroughProps = {
  text: string;
  className?: string;
};
export default function StrikeThrough({ text, className }: StrikeThroughProps) {
  return (
    <>
      <p className={cn(`line-through text-lg font-medium`, className)}>
        {text}
      </p>
    </>
  );
}
