export type Import = Record<string, string>;
export type Imports = Record<string, Import>;
export type Exports = Record<string, string>;

export type Replacements = Record<string, string>;

export type ExtractMode = "at-rule" | "auto" | "rule";

export type RulesMode = "at-rule" | "rule";
