import type { Plugin as VitePlugin } from 'vite';
import obfuscator from 'javascript-obfuscator';
import type { ObfuscatorOptions } from 'javascript-obfuscator';

export interface IOptions {
  includeRegEx: RegExp;
  excludeRegEx: RegExp;
  options: ObfuscatorOptions;
}

export const INCLUDE_REGEX = /\.(js|jsx|ts|tsx|cjs|mjs)$/;
export const EXCLUDE_REGEX = /^(?!.*\.(spec|test)\.(ts|js)$).*\.(js|ts)$/;

export const DEFAULT_OBFUSCATION_OPTIONS: ObfuscatorOptions = {
  // compact: true,
  // controlFlowFlattening: true,
  // controlFlowFlatteningThreshold: 0.3,
  numbersToExpressions: true,
  simplify: true,
  // stringArrayShuffle: true,
  splitStrings: true,
  stringArrayThreshold: 1,
  // deadCodeInjection: true,
  // deadCodeInjectionThreshold: 1,
  // debugProtection: true,
  disableConsoleOutput: true,
  // debugProtectionInterval: 4000,
  // selfDefending: true,
  stringArray: true,
  stringArrayRotate: true,
  stringArrayIndexShift: true,
  // stringArrayIndexesType: ["hexadecimal-number"],
  // stringArrayWrappersCount: 2,
  stringArrayWrappersType: 'function',
  // stringArrayWrappersParametersMaxCount: 5,
  // stringArrayWrappersChainedCalls: true,
  stringArrayEncoding: ['rc4'],
  identifierNamesGenerator: 'mangled-shuffled',
  transformObjectKeys: true,
};

export const fileMatcher = (regex: RegExp) => (path: string) => regex.test(path);

const { obfuscate } = obfuscator;

function plugin(opts?: IOptions): VitePlugin {
  const includeRegEx = opts?.includeRegEx ?? INCLUDE_REGEX;
  const excludeRegEx = opts?.includeRegEx ?? EXCLUDE_REGEX;
  const obfuscatorOptions = opts?.options ?? DEFAULT_OBFUSCATION_OPTIONS;

  let canObfuscate: boolean = true;

  return {
    name: 'kadirnacar',
    enforce: 'post',
    apply: 'build',
    buildStart: () => {
      // if (!(includeRegEx instanceof RegExp)) {
      //   console.warn('includeRegEx must be a regular expression');
      //   canObfuscate = false;
      // }

      // if (!(excludeRegEx instanceof RegExp)) {
      //   console.warn('excludeRegEx must be a regular expression');
      //   canObfuscate = false;
      // }
    },
    transform: (code, id) => {

      if (id.includes('node_modules')) {
        return { code };
      }
      // if (!canObfuscate) return;

      // const includeMatcher = fileMatcher(includeRegEx);
      // const excludeMatcher = fileMatcher(excludeRegEx);

      // const isLegible = includeMatcher(id) && excludeMatcher(id);

      // if (isLegible) {
        const obfuscationResult = obfuscate(code, obfuscatorOptions);

        return {
          code: obfuscationResult.getObfuscatedCode(),
          ...(obfuscatorOptions.sourceMap && obfuscatorOptions.sourceMapMode !== 'inline'
            ? {}
            : // ? { map: obfuscationResult.getSourceMap() }
              {}),
        // };
      }
    },
  };
}

export default plugin;
