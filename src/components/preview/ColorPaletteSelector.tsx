import { PreviewColorPalette } from "../../types";

function ColorPaletteSelector({
  changeColor,
  colorPalette,
}: {
  changeColor: React.ChangeEventHandler<HTMLInputElement>;
  colorPalette: PreviewColorPalette;
}) {
  return (
    <section className="color-palette-selector">
      <h3>Color Palette:</h3>
      <input
        className="h-7 px-1"
        type="color"
        id="header-color"
        value={colorPalette.header}
        name="header"
        onChange={changeColor}
      />
      <input
        className="h-7 px-1"
        type="color"
        id="aside-color"
        value={colorPalette.aside}
        name="aside"
        onChange={changeColor}
      />
      <input
        className="h-7 px-1"
        type="color"
        id="main-color"
        value={colorPalette.main}
        name="main"
        onChange={changeColor}
      />
    </section>
  );
}

export default ColorPaletteSelector;
