import { MouseEventHandler } from "react";

function MainHeaderButton({
  isChangeModeButton,
  onClick,
  text,
  icon,
}: {
  isChangeModeButton: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | (() => void);
  text: string;
  icon?: JSX.Element;
}) {
  const changeModeButtonColor = {
    initial: "bg-lightseagreen",
    hover: "hover:bg-darkseagreen",
  };
  const normalButtonColor = {
    initial: "bg-transparent",
    hover: "hover:bg-slate-300",
  };

  const backgroundColor = isChangeModeButton
    ? changeModeButtonColor.initial
    : normalButtonColor.initial;

  const backgroundColorHover = isChangeModeButton
    ? changeModeButtonColor.hover
    : normalButtonColor.hover;

  return (
    <button
      type="button"
      className={`min-w-24 h-10 box-border px-3 rounded-md flex items-center gap-2 ${backgroundColor} ${backgroundColorHover}`}
      onClick={onClick}
    >
      {icon} {text}
    </button>
  );
}

export default MainHeaderButton;
