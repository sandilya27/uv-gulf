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

// Visible draft content for layout review, replaced by approved profiles when supplied.
export const TEAM_PREVIEW = [
  { role: "Inspection & testing", bio: "A place to introduce the people supporting equipment inspection and testing, their experience and their areas of focus." },
  { role: "Training", bio: "A place to introduce the people delivering industrial training, their teaching approach and their specialist subjects." },
  { role: "Client coordination", bio: "A place to introduce the people helping clients discuss requirements, plan assignments and coordinate enquiries." },
] as const;

export const PUBLISHED_TEAM = TEAM_MEMBERS.filter((member) =>
  member.permissionToPublish && [member.id, member.name, member.role, member.bio, member.portrait.src, member.portrait.alt].every((value) => value.trim())
);
