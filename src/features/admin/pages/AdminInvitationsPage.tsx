import { useEffect, useMemo, useState } from "react";
import { Plus, Sparkles } from "lucide-react";

import { InvitationFilters } from "@/features/admin/invitations/components/InvitationFilters";
import { InvitationStats } from "@/features/admin/invitations/components/InvitationStats";
import { InvitationsTable } from "@/features/admin/invitations/components/InvitationsTable";
import { getInvitationTemplateCategories } from "@/features/admin/invitations/services/invitationCategoryService";
import { getAdminInvitationTemplates } from "@/features/admin/invitations/services/invitationTemplateService";
import type { InvitationTemplateCategory } from "@/features/admin/invitations/types/invitationCategory.types";
import type { AdminInvitation } from "@/features/admin/invitations/types/invitation.types";

export function AdminInvitationsPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [premiumFilter, setPremiumFilter] = useState("all");
  const [invitations, setInvitations] = useState<AdminInvitation[]>([]);
  const [categories, setCategories] = useState<InvitationTemplateCategory[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPageData() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [templates, categoryList] = await Promise.all([
          getAdminInvitationTemplates(),
          getInvitationTemplateCategories(),
        ]);

        if (!isMounted) {
          return;
        }

        setInvitations(templates);
        setCategories(categoryList);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Davetiyeler yüklenirken bir hata oluştu.";

        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryOptions = useMemo(() => {
    return [
      { label: "Tüm Kategoriler", value: "all" },
      ...categories.map((category) => ({
        label: category.title,
        value: category.id,
      })),
    ];
  }, [categories]);

  const filteredInvitations = useMemo(() => {
    return invitations.filter((invitation) => {
      const matchesCategory =
        categoryFilter === "all" || invitation.categoryValue === categoryFilter;

      const matchesPremium =
        premiumFilter === "all" ||
        (premiumFilter === "premium" && invitation.isPremium) ||
        (premiumFilter === "standard" && !invitation.isPremium);

      return matchesCategory && matchesPremium;
    });
  }, [categoryFilter, invitations, premiumFilter]);

  const handleClearFilters = () => {
    setCategoryFilter("all");
    setPremiumFilter("all");
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-manropeSemiBold text-primaryDark">
            <Sparkles size={17} />
            Davetiye Yönetimi
          </p>

          <h1 className="font-cormorantBold text-4xl text-textDark lg:text-5xl">
            Davetiyeleri Listele
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-textMuted">
            Sistemdeki tüm davetiye şablonlarını, premium durumlarını ve
            kategorilerini buradan yönetin.
          </p>
        </div>

        <button
          type="button"
          className="btn border-0 bg-primaryDark px-6 text-white shadow-button hover:bg-primaryDark"
        >
          <Plus size={18} />
          Yeni Davetiye Ekle
        </button>
      </header>

      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-borderSoft bg-surface px-5 py-4 shadow-cardSoft">
          <p className="text-sm font-semibold text-textMuted">
            Davetiyeler yükleniyor...
          </p>
        </div>
      ) : (
        <>
          <div className="grid items-stretch gap-5 xl:grid-cols-[1.1fr_1fr]">
            <InvitationStats invitations={invitations} />

            <InvitationFilters
              categoryFilter={categoryFilter}
              premiumFilter={premiumFilter}
              categoryOptions={categoryOptions}
              onCategoryFilterChange={setCategoryFilter}
              onPremiumFilterChange={setPremiumFilter}
              onClearFilters={handleClearFilters}
            />
          </div>

          <InvitationsTable invitations={filteredInvitations} />
        </>
      )}
    </div>
  );
}
