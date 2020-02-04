import * as RPCTypes from './rpc-gen'
import {ConversationIDKey} from './chat2'
import {RetentionPolicy} from './retention-policy'
import * as RPCChatTypes from './rpc-chat-gen'
import {TeamBuildingSubState} from './team-building'

export type TeamID = string
export const stringToTeamID = (s: string): TeamID => s
export const teamIDToString = (t: TeamID): string => t
export const noTeamID = 'NOTEAMID'

export type TeamRoleType = 'reader' | 'writer' | 'admin' | 'owner' | 'bot' | 'restrictedbot'
export type DisabledReasonsForRolePicker = {[K in TeamRoleType]?: string}
export type MaybeTeamRoleType = 'none' | TeamRoleType
export type TeamOperations = Omit<RPCTypes.TeamOperation, 'leaveTeam' | 'setMemberShowcase'>
export type PublicitySettings = {
  ignoreAccessRequests: boolean
  openTeam: boolean
  openTeamRole: TeamRoleType
  publicityAnyMember: boolean
  publicityMember: boolean
  publicityTeam: boolean
}

export type Teamname = string

export type TeamProfileAddList = {
  disabledReason: string
  teamName: Teamname
  open: boolean
}
export type _PublicitySettings = {
  anyMemberShowcase: boolean
  description: string
  ignoreAccessRequests: boolean
  member: boolean
  team: boolean
}

export type TeamSettings = {} & RPCTypes.TeamSettings

export type ChannelMembershipState = {[K in ConversationIDKey]: boolean}

export type ChannelInfo = {
  channelname: string
  description: string
  hasAllMembers?: boolean | null
  memberStatus: RPCChatTypes.ConversationMemberStatus
  mtime: number
  numParticipants: number
}

export type MemberStatus = 'active' | 'deleted' | 'reset'
export type MemberInfo = {
  fullName: string
  status: MemberStatus
  type: TeamRoleType
  username: string
}

export type InviteInfo = {
  email: string
  phone: string
  name: string
  role: TeamRoleType
  username: string
  id: string
}

export type TabKey = 'members' | 'invites' | 'bots' | 'subteams' | 'settings'

export type TypeMap = {[K in TeamRoleType]: string}

export type BoolTypeMap = {[K in TeamRoleType]: boolean}

export type EmailInviteError = {
  malformed: Set<string>
  message: string
}

export type AddUserToTeamsState = 'notStarted' | 'pending' | 'succeeded' | 'failed'

export type TeamDetails = {
  allowPromote: boolean
  id: TeamID
  isMember: boolean
  isOpen: boolean
  memberCount: number
  role: MaybeTeamRoleType
  showcasing: boolean
  teamname: string

  members?: Map<string, MemberInfo>
  settings?: TeamSettings
  invites?: Set<InviteInfo>
  subteams?: Set<TeamID>
  requests?: Set<string>
}

export type TeamRoleAndDetails = {
  implicitAdmin: boolean
  role: MaybeTeamRoleType
}

export type TeamRoleMap = {
  latestKnownVersion: number
  loadedVersion: number
  roles: Map<TeamID, TeamRoleAndDetails>
}

export type State = {
  readonly addUserToTeamsState: AddUserToTeamsState
  readonly addUserToTeamsResults: string
  readonly canPerform: Map<TeamID, TeamOperations>
  readonly deletedTeams: Array<RPCTypes.DeletedTeamInfo>
  readonly errorInAddToTeam: string
  readonly errorInChannelCreation: string
  readonly errorInEditDescription: string
  readonly errorInEmailInvite: EmailInviteError
  readonly errorInSettings: string
  readonly errorInTeamCreation: string
  readonly errorInTeamInvite: string
  readonly errorInTeamJoin: string
  readonly invitesCollapsed: Set<TeamID>
  readonly teamsWithChosenChannels: Set<Teamname>
  readonly sawChatBanner: boolean
  readonly sawSubteamsBanner: boolean
  readonly teamAccessRequestsPending: Set<Teamname>
  readonly teamJoinSuccess: boolean
  readonly teamJoinSuccessOpen: boolean
  readonly teamJoinSuccessTeamName: string
  readonly teamDetails: Map<TeamID, TeamDetails>
  readonly teamDetailsSubscriptionCount: Map<TeamID, number> // >0 if we are eagerly reloading a team
  readonly teamDetailsMetaStale: boolean // if we've received an update since we last loaded team list
  readonly teamDetailsMetaSubscribeCount: number // if >0 we are eagerly reloading team list
  readonly teamIDToChannelInfos: Map<TeamID, Map<ConversationIDKey, ChannelInfo>>
  readonly teamIDToMembers: Map<TeamID, Map<string, MemberInfo>> // Used by chat sidebar until team loading gets easier
  readonly teamIDToPublicitySettings: Map<TeamID, _PublicitySettings>
  readonly teamIDToResetUsers: Map<TeamID, Set<string>>
  readonly teamIDToRetentionPolicy: Map<TeamID, RetentionPolicy>
  readonly teamNameToID: Map<Teamname, string>
  readonly teamNameToLoadingInvites: Map<Teamname, Map<string, boolean>>
  readonly teamnames: Set<Teamname> // TODO remove
  readonly teamProfileAddList: Array<TeamProfileAddList>
  readonly teamRoleMap: TeamRoleMap
  readonly newTeams: Set<TeamID>
  readonly newTeamRequests: Map<TeamID, number>
  readonly teamBuilding: TeamBuildingSubState
}
