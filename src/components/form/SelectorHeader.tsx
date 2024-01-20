import { FaPlus } from "react-icons/fa";

function SelectorHeader({
  formIsActive,
  title,
  openForm,
}: {
  formIsActive: boolean;
  title: string;
  openForm: () => void;
}) {
  return (
    <header className="flex flex-row bg-slate-100 justify-between mb-2 box-border py-1 px-2">
      <section className="title">{title}</section>
      {!formIsActive && (
        <button
          type="button"
          className="bg-transparent border-none cursor-pointer"
          onClick={openForm}
          title="Add"
        >
          <FaPlus className="text-xs" />
        </button>
      )}
    </header>
  );
}

export default SelectorHeader;
