'use client';

const data = {
  views: 40,
};

export default function ArticleView() {
  return (
    <div className="flex items-center gap-4 ">
      <span className="text-black dark:text-gray-500">{data.views} views</span>
    </div>
  );
}
