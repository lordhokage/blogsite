'use client';
import { useState } from 'react';

// Sample data for preview
const sampleComments = [
  {
    id: '1',
    created_at: '2025-04-24T15:30:00Z',
    post_id: 'sample-post',
    user_name: 'Sarah Johnson',
    content:
      'This was a great article! I particularly enjoyed the section about state management in React. Looking forward to more content like this.',
    parent_id: null,
  },
  {
    id: '2',
    created_at: '2025-04-24T16:45:00Z',
    post_id: 'sample-post',
    user_name: 'Michael Chen',
    content:
      'Interesting perspective. Have you considered comparing this approach with the newer React Server Components?',
    parent_id: null,
  },
  {
    id: '3',
    created_at: '2025-04-24T17:15:00Z',
    post_id: 'sample-post',
    user_name: 'Sarah Johnson',
    content:
      "That's a great point! Server Components would definitely change how we approach this problem.",
    parent_id: '2',
  },
  {
    id: '4',
    created_at: '2025-04-25T09:30:00Z',
    post_id: 'sample-post',
    user_name: 'Alex Rodriguez',
    content:
      'I implemented this in my project and it worked perfectly. One suggestion: it might be worth mentioning the performance considerations for larger applications.',
    parent_id: null,
  },
];

// Function to format dates in a readable way
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

// Comment component that displays a single comment
function Comment({ comment, replies, onReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');

  const handleSubmitReply = () => {
    if (replyName.trim() && replyText.trim()) {
      onReply(comment.id, replyName, replyText);
      setReplyText('');
      setReplyName('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="border-l-2 border-gray-200 pl-4 mb-4">
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-blue-700">{comment.user_name}</h4>
          <span className="text-xs text-gray-500">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-800">{comment.content}</p>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
      </div>

      {showReplyForm && (
        <div className="mt-2 ml-6">
          <div className="space-y-3">
            <div>
              <label
                htmlFor={`reply-name-${comment.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id={`reply-name-${comment.id}`}
                value={replyName}
                onChange={(e) => setReplyName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor={`reply-content-${comment.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Reply
              </label>
              <textarea
                id={`reply-content-${comment.id}`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              onClick={handleSubmitReply}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post Reply
            </button>
          </div>
        </div>
      )}

      {replies && replies.length > 0 && (
        <div className="ml-6 mt-2">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              replies={[]}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main comment section component
export default function CommentSectionPreview() {
  const [comments, setComments] = useState(sampleComments);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Organize comments into a tree structure
  const commentTree = comments.reduce(
    (acc, comment) => {
      if (!comment.parent_id) {
        acc.root.push(comment);
      } else {
        if (!acc.replies[comment.parent_id]) {
          acc.replies[comment.parent_id] = [];
        }
        acc.replies[comment.parent_id].push(comment);
      }
      return acc;
    },
    { root: [], replies: {} }
  );

  const handleAddComment = () => {
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment = {
      id: String(comments.length + 1),
      created_at: new Date().toISOString(),
      post_id: 'sample-post',
      user_name: newCommentName,
      content: newCommentText,
      parent_id: null,
    };

    setComments([...comments, newComment]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const handleAddReply = (parentId, userName, content) => {
    if (!userName.trim() || !content.trim()) return;

    const newReply = {
      id: String(comments.length + 1),
      created_at: new Date().toISOString(),
      post_id: 'sample-post',
      user_name: userName,
      content: content,
      parent_id: parentId,
    };

    setComments([...comments, newReply]);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments</h2>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4 text-gray-800">
          Leave a comment
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="userName"
              value={newCommentName}
              onChange={(e) => setNewCommentName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="content"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Comment
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4 text-gray-800">
          {comments.filter((c) => !c.parent_id).length} Comments
        </h3>

        <div className="space-y-4">
          {commentTree.root.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              replies={commentTree.replies[comment.id] || []}
              onReply={handleAddReply}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
