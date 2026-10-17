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
  { name: "Omar Al-Faris", role: "Inspection Manager", bio: "Coordinates inspection assignments and helps teams turn technical requirements into clear plans and practical next steps." },
  { name: "Daniel Mercer", role: "Training Lead", bio: "Brings a practical approach to industrial learning, connecting classroom discussions with everyday site activities." },
  { name: "Sara Al-Nouri", role: "Client Relations Coordinator", bio: "Helps clients discuss their requirements and keeps communication clear from the first enquiry through assignment planning." },
] as const;

export const PUBLISHED_TEAM = TEAM_MEMBERS.filter((member) =>
  member.permissionToPublish && [member.id, member.name, member.role, member.bio, member.portrait.src, member.portrait.alt].every((value) => value.trim())
);
