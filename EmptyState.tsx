'use client';

interface EmptyStateProps {
  searchQuery?: string;
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-12 max-w-lg w-full text-center">
        <svg
          className="w-20 h-20 text-blue-400 mx-auto mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {searchQuery ? 'No posts found' : 'No posts yet'}
        </h3>
        <p className="text-gray-600 text-lg">
          {searchQuery ? (
            <>
              We couldn`t find any posts matching{' '}
              <span className="font-semibold text-gray-900">"{searchQuery}"</span>
              <br />
              Try adjusting your search terms.
            </>
          ) : (
            'There are no blog posts available at the moment.'
          )}
        </p>
      </div>
    </div>
  );
}