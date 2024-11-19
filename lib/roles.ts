import { UserProfile } from "@auth0/nextjs-auth0/client"

const ROLES_CLAIM_KEY = `${process.env.CUSTOM_CLAIMS_NAMESPACE}/roles`

export const roles = {
  member: process.env.AUTH0_MEMBER_ROLE_ID,
  admin: process.env.AUTH0_ADMIN_ROLE_ID,
}

export type Role = keyof typeof roles

export function getRole(user: UserProfile) {
  console.log(user)
  // we only allow a single role to be assigned to a user
  const roles = user[ROLES_CLAIM_KEY] as string[]

  if (Array.isArray(roles) && roles.length > 0) {
    return roles[0]
  }

  // if no role is assigned, set them to the default member role
  return "member"
}
