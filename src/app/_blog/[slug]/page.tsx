// import { getPostBySlug } from '@/lib/mdx';
// import { MDXRemote } from 'next-mdx-remote/rsc';
// import rehypePrism from 'rehype-prism-plus';

// type BlogPageProps = {
//   params: Promise<{ slug: string }>;
// };

// export async function generateMetadata({ params }: BlogPageProps) {
//   const post = await getPostBySlug((await params).slug);
//   return {
//     title: post.frontMatter.title,
//     description: post.frontMatter.description,
//   };
// }

// export default async function BlogPage({ params }: BlogPageProps) {
//   const post = await getPostBySlug((await params).slug);

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <article className="prose prose-invert prose-neutral max-w-2xl mx-auto p-8">
//         <h1 className="text-center text-4xl font-bold mb-10">
//           {post.frontMatter.title}
//         </h1>
//         <p className="text-center text-md italic text-gray-400 mt-1 ">
//           Filed under <span className="font-medium ">General</span> on{' '}
//           {/* {formatDate(post.frontMatter.date)} */}
//           <br />
//           <span className="text-md ">
//             Last updated on{' '}
//             {/* <strong>{formatDate(post.frontMatter.updated)}</strong> */}
//           </span>
//         </p>
//         <div className="mt-20">
//           <MDXRemote
//             source={post.content}
//             components={{
//               p: (props) => <p {...props} className="mb-6 text-lg"></p>,
//               a: (props) => (
//                 <a
//                   {...props}
//                   className="text-blue-400 underline hover:text-blue-300 transition"
//                 />
//               ),
//               h1: (props) => (
//                 <h1 {...props} className="text-2xl font-semibold mt-10" />
//               ),
//               blockquote: (props) => (
//                 <blockquote
//                   {...props}
//                   className="border-l-4 border-gray-600 pl-4 italic text-gray-300"
//                 />
//               ),
//               code: (props) => (
//                 <code
//                   {...props}
//                   className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded text-sm"
//                 />
//               ),
//             }}
//             options={{
//               mdxOptions: {
//                 rehypePlugins: [rehypePrism],
//               },
//             }}
//           />
//         </div>
//       </article>
//     </div>
//   );
// }
