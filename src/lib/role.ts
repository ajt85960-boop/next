export type AppRole = "ADMIN" | "MANAGER" | "ANNOTATOR";
export type AppModule = "overview" | "devices" | "annotation" | "people";

const roleAccessMap: Record<AppRole, AppModule[]> = {
  ADMIN: ["overview", "devices", "annotation", "people"],
  MANAGER: ["overview", "devices", "annotation"],
  ANNOTATOR: ["annotation"],
};

export function hasModuleAccess(role: string, module: AppModule) {
  const appRole = role as AppRole;
  const allowed = roleAccessMap[appRole] ?? [];
  return allowed.includes(module);
}

export function getRoleMenuModules(role: string) {
  const appRole = role as AppRole;
  return roleAccessMap[appRole] ?? [];
}

export function isAdminRole(role: string) {
  return role === "ADMIN";
}
