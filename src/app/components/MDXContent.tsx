// components/MDXContent.tsx
'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { MDXComponents } from 'mdx/types';

type Props = {
  source: MDXRemoteSerializeResult;
  components?: MDXComponents;
  options?: object;
};

export default function MDXContent({ source, components }: Props) {
  return <MDXRemote {...source} components={components} />;
}
