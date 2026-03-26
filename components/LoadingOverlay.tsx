'use client';

import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export function LoadingOverlay({ isLoading, message = 'Processing your book...' }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white">
        <div className="loading-shadow">
          <Loader2 className="loading-animation" size={48} />
          <h2 className="loading-title">{message}</h2>
          <div className="loading-progress">
            <div className="loading-progress-item">
              <div className="loading-progress-status"></div>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Extracting text</span>
            </div>
            <div className="loading-progress-item">
              <div className="loading-progress-status"></div>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Analyzing content</span>
            </div>
            <div className="loading-progress-item">
              <div className="loading-progress-status"></div>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Generating summary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
