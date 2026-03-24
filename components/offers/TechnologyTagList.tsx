import Link from "next/link";

type TechnologyTag = {
  uid: string;
  name: string;
};

type TechnologyTagListProps = {
  technologies: TechnologyTag[];
  clickable?: boolean;
};

export function TechnologyTagList({
  technologies,
  clickable = true,
}: TechnologyTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((technology) =>
        clickable ? (
          <Link
            key={technology.uid}
            href={`/technologies/${technology.uid}`}
            className="border border-[#2175D9] px-3 py-1 text-xs font-medium text-[#2175D9]"
          >
            {technology.name}
          </Link>
        ) : (
          <span
            key={technology.uid}
            className="border border-[#2175D9] px-3 py-1 text-xs font-medium text-[#2175D9]"
          >
            {technology.name}
          </span>
        ),
      )}
    </div>
  );
}
