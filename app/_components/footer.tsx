export const Footer = () => {
  return (
    <div className="w-full  border-t border-[#374151]">
      <div className="w-full border-b border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 items-center justify-center w-full text-center text-sm md:text-base">
          <span>
            Made with 🍺 and questionable advice by{" "}
            <a target="_blank" href="https://nilabjo.com/">
              @nilabjo
            </a>
          </span>
          <small className="text-[#9CA3AF]">&copy; 2025 RealityChecks</small>
        </div>
      </div>
    </div>
  );
};
