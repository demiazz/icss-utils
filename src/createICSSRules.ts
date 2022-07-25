import { Declaration, Postcss } from "postcss";
import { Exports, Imports, RulesMode } from "./types";

const createImports = (imports: Imports, postcss: Postcss, mode = "rule") => {
  return Object.keys(imports).map((path) => {
    const aliases = imports[path] ?? {};

    const declarations = Object.keys(aliases).reduce((acc, prop) => {
      const value = aliases[prop];

      if (value != null) {
        acc.push(
          postcss.decl({
            prop,
            value,
            raws: {
              before: "\n  ",
              value: {
                value,
                raw: value,
              },
            },
          })
        );
      }

      return acc;
    }, [] as Declaration[]);

    const hasDeclarations = declarations.length > 0;

    const rule =
      mode === "rule"
        ? postcss.rule({
            selector: `:import('${path}')`,
            raws: { after: hasDeclarations ? "\n" : "" },
          })
        : postcss.atRule({
            name: "icss-import",
            params: `'${path}'`,
            raws: { after: hasDeclarations ? "\n" : "" },
          });

    if (hasDeclarations) {
      rule.append(declarations);
    }

    return rule;
  });
};

const createExports = (
  exports: Exports,
  postcss: Postcss,
  mode: RulesMode = "rule"
) => {
  const declarations = Object.keys(exports).reduce((acc, prop) => {
    const value = exports[prop];

    if (value != null) {
      acc.push(
        postcss.decl({
          prop: prop,
          value: value,
          raws: {
            before: "\n  ",
            value: {
              value,
              raw: value,
            },
          },
        })
      );
    }

    return acc;
  }, [] as Declaration[]);

  if (declarations.length === 0) {
    return [];
  }

  const rule =
    mode === "rule"
      ? postcss.rule({
          selector: `:export`,
          raws: {
            after: "\n",
          },
        })
      : postcss.atRule({
          name: "icss-export",
          raws: {
            after: "\n",
          },
        });

  rule.append(declarations);

  return [rule];
};

export const createICSSRules = (
  imports: Imports,
  exports: Exports,
  postcss: Postcss,
  mode?: RulesMode
) => [
  ...createImports(imports, postcss, mode),
  ...createExports(exports, postcss, mode),
];
