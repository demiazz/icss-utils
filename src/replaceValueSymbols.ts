import { Replacements } from "./types";

const matchValueName = /[$]?[\w-]+/g;

export const replaceValueSymbols = (
  value: string,
  replacements: Replacements
) => {
  let matches;

  while ((matches = matchValueName.exec(value))) {
    if (matches[0] != null) {
      const replacement = replacements[matches[0]];

      if (replacement) {
        value =
          value.slice(0, matches.index) +
          replacement +
          value.slice(matchValueName.lastIndex);

        matchValueName.lastIndex -= matches[0].length - replacement.length;
      }
    }
  }

  return value;
};
