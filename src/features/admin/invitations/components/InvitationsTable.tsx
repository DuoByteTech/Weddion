import { CalendarDays, Crown, Edit3, ImageIcon, Trash2 } from "lucide-react";

import { AppCard, AppSearchInput } from "@/components/ui";
import type { AdminInvitation } from "../types/invitation.types";

type InvitationsTableProps = {
  invitations: AdminInvitation[];
};

export function InvitationsTable({ invitations }: InvitationsTableProps) {
  return (
    <AppCard className="p-4">
      <div className="mb-4 flex flex-col gap-3 px-2 pt-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-cormorantBold text-3xl text-textDark">
            Davetiye Listesi
          </h2>

          <p className="mt-1 text-sm text-textMuted">
            Tüm davetiye şablonlarını tablo üzerinden yönetin.
          </p>
        </div>

        <AppSearchInput
          placeholder="Tabloda ara..."
          containerClassName="w-full md:w-80"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-borderSoft text-sm text-primaryDark">
              <th>Görseli</th>
              <th>Adı</th>
              <th>Kategorisi</th>
              <th>Premium Mu</th>
              <th>Oluşturma Tarihi</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {invitations.map((invitation) => (
              <tr
                key={invitation.id}
                className="border-borderSoft hover:bg-primarySoft/35"
              >
                <td>
                  <div className="avatar">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border border-borderSoft bg-primarySoft">
                      {invitation.imageUrl ? (
                        <img
                          src={invitation.imageUrl}
                          alt={invitation.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon size={20} className="text-primaryDark" />
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <div className="font-cormorantBold text-2xl text-textDark">
                    {invitation.name}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-sm text-textMuted">
                    <ImageIcon size={16} className="text-primaryDark" />
                    <span>{invitation.category}</span>
                  </div>
                </td>

                <td>
                  {invitation.isPremium ? (
                    <span className="badge border-0 bg-primarySoft px-4 py-3 text-primaryDark">
                      <Crown size={14} />
                      Premium
                    </span>
                  ) : (
                    <span className="badge border-borderSoft bg-white px-4 py-3 text-textMuted">
                      Standart
                    </span>
                  )}
                </td>

                <td>
                  <div className="flex items-center gap-2 text-sm text-textMuted">
                    <CalendarDays size={16} className="text-primaryDark" />
                    <span>{invitation.createdAt}</span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="btn btn-sm border-borderSoft bg-white text-primaryDark hover:border-primaryLight hover:bg-primarySoft"
                    >
                      <Edit3 size={15} />
                      Düzenle
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm border-red-100 bg-red-50 text-red-500 hover:border-red-200 hover:bg-red-100"
                    >
                      <Trash2 size={15} />
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {invitations.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="py-8 text-center text-sm text-textMuted">
                    Gösterilecek davetiye bulunamadı.
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AppCard>
  );
}
