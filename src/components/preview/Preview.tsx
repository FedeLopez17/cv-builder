import { Mode, PersonalInfo, PreviewColorPalette } from "../../types";
import html2pdf from "html2pdf.js";
import Layout from "./Layout";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import PageSelector from "./PageSelector";
import ColorPaletteSelector from "./ColorPaletteSelector";
import FontSelector from "./FontSelector";
import MainHeader from "../MainHeader";
import MainHeaderButton from "../MainHeaderButton";
import { FaEdit, FaFileDownload } from "react-icons/fa";

function Preview({
  personalInfo,
  changeMode,
  changeColor,
  colorPalette,
  changeFont,
  font,
}: {
  personalInfo: PersonalInfo;
  changeMode: (mode: Mode) => void;
  changeColor: ChangeEventHandler<HTMLInputElement>;
  colorPalette: PreviewColorPalette;
  changeFont: (newFont: string) => void;
  font: string;
}) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [layoutLoaded, setLayoutLoaded] = useState(false);

  const [pagesData, setPagesData] = useState({ currentPage: 1, totalPages: 1 });

  const handlePageChange = (pageChange: number) => {
    const container = cvPreviewRef.current as HTMLDivElement;
    const pageHeight = container.clientHeight;
    const newPage = pagesData.currentPage + pageChange;

    if (newPage < 1 || newPage > pagesData.totalPages) return;

    container.scrollBy(0, pageHeight * pageChange);
    setPagesData((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
  };

  useEffect(() => {
    if (!document.fonts) {
      setFontLoaded(true);
      return;
    }

    // Check if all fonts are loaded
    const fontLoaded = document.fonts.check(`1em ${font}`);

    if (fontLoaded) {
      setFontLoaded(true);
    } else {
      // Listen for the 'loadingdone' event
      document.fonts.addEventListener("loadingdone", () => {
        setFontLoaded(true);
      });
    }
  }, [font]);

  const cvPreviewRef = useRef<HTMLDivElement>(null);

  // TO FIX: THIS IS NOT WORKING CORRECTLY
  // What we do here is tidy up the preview so that no element is split in between two pages and we also make it so that the previews' height grows in chuncks the size of a page.
  useEffect(() => {
    if (!fontLoaded || !layoutLoaded) return;

    const container = cvPreviewRef.current as HTMLDivElement;

    const pageHeight = container.clientHeight;

    // By "verticalRegions" I mean the aside and main sections of the layout
    const verticalRegions: NodeListOf<HTMLElement>[] = [
      document.querySelectorAll<HTMLElement>("#layout > aside > *"),
      document.querySelectorAll<HTMLElement>("#layout > main > *"),
    ];

    const getElementTotalHeight = (element: HTMLElement) => {
      const { marginBottom, marginTop } = window.getComputedStyle(element);
      return (
        element.offsetHeight + parseInt(marginBottom) + parseInt(marginTop)
      );
    };

    const headerHeight = getElementTotalHeight(
      document.querySelector("#layout > header") as HTMLDivElement
    );

    const calculateMarginTopToNextPage = (
      elementHeight: number,
      cumulativeHeight: number,
      pagesAddedHeight: number
    ) => elementHeight - (cumulativeHeight - pagesAddedHeight) + "px";

    let numberOfPages = 1;

    verticalRegions.forEach((verticalRegion) => {
      let cumulativeHeight = headerHeight;
      let currentPageNumber = 1;

      verticalRegion.forEach((cvSection) => {
        (cvSection.childNodes as NodeListOf<HTMLElement>).forEach(
          (element, index) => {
            const totalHeight = getElementTotalHeight(element);
            cumulativeHeight += totalHeight;
            if (cumulativeHeight > pageHeight * currentPageNumber) {
              // If we are iterating over the second element and that element exceeds the page height, then move the first one to the next page as well.
              // This is done to prevent stuff like having a heading in one page and the entries in the next one.
              if (index === 1) {
                const firstElement = cvSection.firstElementChild as HTMLElement;
                const firstElementTotalHeight =
                  getElementTotalHeight(firstElement);
                const marginToNextPage = calculateMarginTopToNextPage(
                  firstElementTotalHeight,
                  cumulativeHeight - firstElementTotalHeight,
                  pageHeight * currentPageNumber
                );
                cumulativeHeight += parseInt(marginToNextPage);
                firstElement.style.marginTop = marginToNextPage;
                currentPageNumber++;

                if (cumulativeHeight > pageHeight * currentPageNumber) {
                  element.style.marginTop = calculateMarginTopToNextPage(
                    totalHeight,
                    cumulativeHeight,
                    pageHeight * currentPageNumber
                  );
                  currentPageNumber++;
                }
              } else {
                element.style.marginTop = calculateMarginTopToNextPage(
                  totalHeight,
                  cumulativeHeight,
                  pageHeight * currentPageNumber
                );

                currentPageNumber++;
              }
            } else {
              // Clearing the previous marginTop
              element.style.marginTop = "0";
            }
          }
        );

        const { marginBottom } = window.getComputedStyle(cvSection);
        cumulativeHeight += parseInt(marginBottom);

        if (currentPageNumber > numberOfPages) {
          numberOfPages = currentPageNumber;
        }
      });
    });

    if (numberOfPages > 1) {
      const layout = container.querySelector("#layout") as HTMLElement;
      layout.style.height = (pageHeight * numberOfPages).toString() + "px";
      setPagesData((prevState) => ({
        ...prevState,
        totalPages: numberOfPages,
      }));
    }
  }, [fontLoaded, layoutLoaded]);

  const downloadPDF = () => {
    const { firstName, lastName } = personalInfo;

    const options = {
      margin: 0,
      filename: `cv-${firstName?.toLowerCase().trim()}-${lastName
        ?.toLowerCase()
        .trim()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: {
        unit: "mm",
        // I add .1 to the height, so that it doesn't generate a blank page after the last page.
        // 297mm by 210mm is the format of an A4 sheet of paper.
        format: [297.1, 210],
        orientation: "portrait",
        precision: 16,
      },
    };

    html2pdf()
      .set(options)
      .from(document.querySelector("#layout") as HTMLElement)
      .save()
      .catch((err) => console.error(err));
  };

  return (
    <section
      id="preview-container"
      className="flex flex-col justify-center items-center bg-slate-50 min-height-screen"
    >
      <MainHeader
        content={
          <>
            <MainHeaderButton
              onClick={() => changeMode("edit")}
              text="Edit"
              isChangeModeButton={true}
              icon={<FaEdit />}
            />
            <MainHeaderButton
              onClick={downloadPDF}
              text="Download"
              isChangeModeButton={false}
              icon={<FaFileDownload />}
            />
          </>
        }
      />

      <section className="w-a4 flex mb-2 items-stretch gap-3 scaling-element text-sm">
        <ColorPaletteSelector
          changeColor={changeColor}
          colorPalette={colorPalette}
        />

        <FontSelector currentFont={font} changeFont={changeFont} />

        <PageSelector
          currentPage={pagesData.currentPage}
          totalPages={pagesData.totalPages}
          previousPage={() => handlePageChange(-1)}
          nextPage={() => handlePageChange(1)}
        />
      </section>
      <section
        id="cv-preview"
        className="scaling-element w-a4 h-a4 mb-10 overflow-hidden origin-top shadow-md shadow-slate-400"
        ref={cvPreviewRef}
      >
        <Layout
          {...{
            personalInfo,
            colorPalette,
            font,
            onLayoutLoad: () => setLayoutLoaded(true),
          }}
        ></Layout>
      </section>
    </section>
  );
}

export default Preview;
