import type { MDXComponents } from "mdx/types";
import CodePre from "@/components/code-pre";
import { ComponentProps } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		code: (props: ComponentProps<"code">) => <CodePre {...props} />,
	};
}
