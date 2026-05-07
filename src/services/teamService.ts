import { fetchAllPages } from "@/services/api";
import type { TeamMember } from "@/types/team";

function getTeamOrder(member: TeamMember): number {
  return (
    member.display_order ??
    member.ordering ??
    member.order ??
    Number.MAX_SAFE_INTEGER
  );
}

function getRolePriority(member: TeamMember): number {
  const role = `${member.role || ""} ${member.designation || ""}`.toLowerCase();
  if (role.includes("founder") || role.includes("ceo")) return 0;
  if (role.includes("cto")) return 1;
  if (role.includes("engineering")) return 2;
  if (role.includes("creative")) return 3;
  return 10;
}

export async function fetchTeamMembers(
  signal?: AbortSignal,
): Promise<TeamMember[]> {
  const members = await fetchAllPages<TeamMember>("/team/", signal);

  return members
    .filter((member) => member.is_active !== false)
    .sort((a, b) => {
      const orderDifference = getTeamOrder(a) - getTeamOrder(b);
      if (orderDifference !== 0) return orderDifference;

      const roleDifference = getRolePriority(a) - getRolePriority(b);
      if (roleDifference !== 0) return roleDifference;

      return (a.name || "").localeCompare(b.name || "");
    });
}
