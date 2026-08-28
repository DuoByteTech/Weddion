import { X } from "lucide-react";

import { AppActionButton, AppCard, AppSelect } from "@/components/ui";

type SelectOption = {
  label: string;
  value: string;
};

type InvitationFiltersProps = {
  categoryFilter: string;
  premiumFilter: string;
  categoryOptions: SelectOption[];
  onCategoryFilterChange: (value: string) => void;
  onPremiumFilterChange: (value: string) => void;
  onClearFilters: () => void;
};

const premiumOptions: SelectOption[] = [
  { label: "Premium Durumu", value: "all" },
  { label: "Premium", value: "premium" },
  { label: "Standart", value: "standard" },
];

export function InvitationFilters({
  categoryFilter,
  premiumFilter,
  categoryOptions,
  onCategoryFilterChange,
  onPremiumFilterChange,
  onClearFilters,
}: InvitationFiltersProps) {
  const normalizedCategoryOptions =
    categoryOptions.length > 0
      ? categoryOptions
      : [{ label: "Tüm Kategoriler", value: "all" }];

  return (
    <AppCard className="flex h-full items-center">
      <div className="grid w-full gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <AppSelect
          options={normalizedCategoryOptions}
          value={categoryFilter}
          onValueChange={onCategoryFilterChange}
        />

        <AppSelect
          options={premiumOptions}
          value={premiumFilter}
          onValueChange={onPremiumFilterChange}
        />

        <AppActionButton
          onClick={onClearFilters}
          className="h-12 rounded-2xl px-5"
        >
          <X size={17} />
          Temizle
        </AppActionButton>
      </div>
    </AppCard>
  );
}
