
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { Card } from './Card';

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <Link to={`/blog/${post.slug}`} className="block">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>{post.date}</span>
          <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-textLight dark:text-textDark mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {post.excerpt}
        </p>
      </Link>
    </Card>
  );
};
