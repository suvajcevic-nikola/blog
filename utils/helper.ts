type ClsParam = string | boolean | undefined | null;

export const cls = (...classes: ClsParam[]) =>
  classes.filter(Boolean).join(" ");
