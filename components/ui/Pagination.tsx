import Link from "next/link";

type PaginationProps = {
  pathname: string;
  currentPage: number;
  totalPages: number;
};

function getPageHref(pathname: string, page: number) {
  if (page <= 1) {
    return pathname;
  }

  return `${pathname}?page=${page}`;
}

export function Pagination({
  pathname,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination des offres"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href={getPageHref(pathname, currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`px-3 py-2 text-sm font-medium ${
          currentPage === 1
            ? "pointer-events-none border border-[#D7DCE8] text-[#9AA3B6]"
            : "border border-[#2175D9] text-[#2175D9]"
        }`}
      >
        Precedent
      </Link>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isCurrentPage = page === currentPage;

        return (
          <Link
            key={page}
            href={getPageHref(pathname, page)}
            aria-current={isCurrentPage ? "page" : undefined}
            className={`px-3 py-2 text-sm font-medium ${
              isCurrentPage
                ? "bg-[#2175D9] text-white"
                : "border border-[#2175D9] text-[#2175D9]"
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={getPageHref(pathname, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`px-3 py-2 text-sm font-medium ${
          currentPage === totalPages
            ? "pointer-events-none border border-[#D7DCE8] text-[#9AA3B6]"
            : "border border-[#2175D9] text-[#2175D9]"
        }`}
      >
        Suivant
      </Link>
    </nav>
  );
}
