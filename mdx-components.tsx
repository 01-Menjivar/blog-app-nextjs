import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

export function useMDXComponents(customComponents?: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
  };
}
