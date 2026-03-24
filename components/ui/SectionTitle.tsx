import type { ReactNode } from "react";

type SectionTitleProps = {
  title: string;
  as?: "h1" | "h2" | "h3";
  rightContent?: ReactNode;
};

export function SectionTitle({
  title,
  as: HeadingTag = "h2",
  rightContent,
}: SectionTitleProps) {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div className="inline-flex flex-col">
          <HeadingTag className="text-4xl font-semibold md:text-5xl">
            {title}
          </HeadingTag>
          <div className="mt-2 h-[10px] w-full bg-[#2D7BF4]" />
        </div>
        {rightContent ? <div className="pb-2">{rightContent}</div> : null}
      </div>
      <div className="h-[2px] w-full bg-[#0F1941]" />
    </div>
  );
}
