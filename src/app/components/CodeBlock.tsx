'use client';
import React, { useEffect } from 'react';
import Prism from 'prismjs';
// Load languages you need
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-js';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

export default function CodeBlock({ className, children }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const language = className?.replace('language-', '') || '';

  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
}
