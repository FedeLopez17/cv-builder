import { MouseEventHandler } from "react";

function EntryFormButtons({
  wrapper,
  entry,
  onCancel,
  onAdd,
}: {
  wrapper: string;
  entry: string;
  onCancel: () => void;
  onAdd: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <section className="mt-2 flex gap-2 self-end">
      <button
        type="button"
        className="bg-gray-50 box-border py-1 px-3 rounded-md"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        type="button"
        data-wrapper={wrapper}
        data-entry={entry}
        className="bg-gray-50 box-border py-1 px-3 rounded-md"
        onClick={onAdd}
      >
        Add Entry
      </button>
    </section>
  );
}

export default EntryFormButtons;
