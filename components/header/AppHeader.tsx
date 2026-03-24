import { HeaderBrand } from "@/components/header/HeaderBrand";
import { HeaderActions } from "@/components/header/HeaderActions";

export function AppHeader() {
  return (
    <header className="border-b-4 border-[#2d7bf4]">
      <div className="w-full bg-[#0F1941] px-6 pt-6 text-white">
        <div className="flex items-center justify-between gap-4 pb-4">
          <HeaderBrand />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
