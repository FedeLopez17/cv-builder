function MainHeader({ content }: { content: JSX.Element }) {
  return (
    <header className="flex justify-between items-center w-full h-14 box-border py-0 px-8 mb-4 bg-slate-50 shadow-main-header">
      {content}
    </header>
  );
}

export default MainHeader;
