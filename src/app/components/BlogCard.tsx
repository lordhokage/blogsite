import Link from 'next/link';

interface BlogCardProps {
  title: string;
  subtitle?: string;
  subtitleLink?: string;
  description: string;
  link: string;
}

export default function BlogCard({
  title,
  subtitle,
  subtitleLink,
  description,
  link,
}: BlogCardProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {subtitle && subtitleLink && (
        <Link
          href={subtitleLink}
          className="text-blue-600 hover:underline text-base font-medium"
        >
          {subtitle}
        </Link>
      )}
      <p className="mt-2 text-gray-700 text-base">{description}</p>
      <Link
        href={link}
        className="mt-3 inline-block text-sm font-semibold text-black hover:text-blue-600"
      >
        Read more <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
