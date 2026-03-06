import { PaginationMeta } from "@/commonJS/interfaces/utilsInterface"
import { RoleListItem, RoleModule } from "@/redux/sagas/handlers/roleMasterHandler/roleMasterHandlerInterface"

export interface RoleState{
  rolesList: RoleListItem[]
  rolesListMeta: PaginationMeta | Record<string, never>
  roleDefinitions: RoleModule[]
}