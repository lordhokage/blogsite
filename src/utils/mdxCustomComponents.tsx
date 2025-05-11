const components = {
  FlexboxWrapper,
  Greet,
  code: (props: MDXRemoteProps) => (
    <code
      {...props}
      className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm text-gray-800 dark:text-gray-200"
    />
  ),
  pre: (props: MDXRemoteProps) => (
    <pre
      {...props}
      className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto"
    />
  ),
  p: (props: MDXRemoteProps) => <p {...props} className="mb-6 text-lg"></p>,
  a: (props: MDXRemoteProps) => (
    <a
      {...props}
      className="text-blue-400 underline hover:text-blue-300 transition"
    />
  ),
  h1: (props: MDXRemoteProps) => (
    <h1 {...props} className="text-lg lg:text-xl font-semibold mt-10" />
  ),
  blockquote: (props: MDXRemoteProps) => (
    <blockquote
      {...props}
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic text-gray-600 dark:text-gray-400"
    />
  ),
};
