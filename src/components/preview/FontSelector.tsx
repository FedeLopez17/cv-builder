export const PREVIEW_FONT_OPTIONS = [
  "Inter",
  "Lato",
  "Lora",
  "Merriweather",
  "Montserrat",
  "Open Sans",
  "Playfair Display",
  "Poppins",
  "Roboto",
];

function FontSelector({
  currentFont,
  changeFont,
}: {
  currentFont: string;
  changeFont: (newFont: string) => void;
}) {
  return (
    <section>
      <h3>Font:</h3>
      <select
        className="h-7 px-1"
        name="font"
        value={currentFont}
        onChange={({ target: { value } }) => changeFont(value)}
      >
        {PREVIEW_FONT_OPTIONS.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </section>
  );
}

export default FontSelector;
