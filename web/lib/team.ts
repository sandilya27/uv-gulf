export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  portrait: { src: string; alt: string };
  permissionToPublish: boolean;
};

// Add only owner-approved profiles with real portraits and publication permission.
export const TEAM_MEMBERS: readonly TeamMember[] = [];

export const PUBLISHED_TEAM = TEAM_MEMBERS.filter((member) =>
  member.permissionToPublish && [member.id, member.name, member.role, member.bio, member.portrait.src, member.portrait.alt].every((value) => value.trim())
);
