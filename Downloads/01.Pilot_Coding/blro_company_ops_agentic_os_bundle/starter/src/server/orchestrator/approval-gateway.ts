const riskyActions = new Set([
  "SEND_EMAIL",
  "SEND_QUOTE",
  "EXTERNAL_SHARE",
  "DELETE_DATA",
  "MOVE_DATA",
  "COST_ACTION",
  "REQUEST_APPROVAL_BEFORE_SEND",
]);

export function requiresApproval(actions: string[]) {
  return actions.some((action) => riskyActions.has(action));
}
