import { IoSection } from "./_components/io-section";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-start md:justify-center gap-8 px-6 pt-4 md:pt-0">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[#9CA3AF] text-base md:text-lg font-medium italic text-center">
          Cruel words, real results — I&apos;m not here to hold your hand.
        </span>
      </div>
      <IoSection />
    </div>
  );
}
