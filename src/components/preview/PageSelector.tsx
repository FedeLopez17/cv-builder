import { MouseEventHandler } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

function PageSelector({
  currentPage,
  totalPages,
  previousPage,
  nextPage,
}: {
  currentPage: number;
  totalPages: number;
  nextPage: MouseEventHandler<HTMLElement>;
  previousPage: MouseEventHandler<HTMLElement>;
}) {
  return (
    <section className="flex gap-3 items-center font-bold ml-auto scaling-element self-end">
      {totalPages > 1 && (
        <FaRegArrowAltCircleLeft
          onClick={previousPage}
          className="cursor-pointer hover:scale-105"
        />
      )}
      <p>
        <span className="current-page">{currentPage}</span>/
        <span className="total-pages">{totalPages}</span>
      </p>
      {totalPages > 1 && (
        <FaRegArrowAltCircleRight
          onClick={nextPage}
          className="cursor-pointer hover:scale-105"
        />
      )}
    </section>
  );
}

export default PageSelector;
