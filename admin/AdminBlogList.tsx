
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export const AdminBlogList: React.FC = () => {
  const { content, deleteBlogPost, loading } = useContent();
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const confirmDelete = (slug: string) => {
    setPostToDelete(slug);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = () => {
    if (postToDelete) {
      deleteBlogPost(postToDelete);
      setIsConfirmModalOpen(false);
      setPostToDelete(null);
      alert('Blog post deleted successfully!');
    }
  };

  if (loading) return <p>Loading blog posts...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-textLight dark:text-textDark">Blog Post Management</h1>
        <Button onClick={() => navigate('/admin/blog/new')} variant="primary">
          Create New Post
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">All Blog Posts</h2>
        {content.blog.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No blog posts yet. Create your first one!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border dark:divide-borderDark">
              <thead className="bg-background dark:bg-cardBackgroundDark">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-cardBackground dark:bg-cardBackgroundDark divide-y divide-border dark:divide-borderDark">
                {content.blog.map((post) => (
                  <tr key={post.id} className="hover:bg-background dark:hover:bg-backgroundDark transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-textLight dark:text-textDark">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors duration-200">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {post.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        to={`/admin/blog/edit/${post.slug}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => confirmDelete(post.slug)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="secondary" className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete the post "{content.blog.find(p => p.slug === postToDelete)?.title}"?
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};
