export function checkPermission(
  permissions: string[] | undefined,
  permissionKey: string,
) {
  if (!permissions) return false;
  return permissions.includes(permissionKey);
}
