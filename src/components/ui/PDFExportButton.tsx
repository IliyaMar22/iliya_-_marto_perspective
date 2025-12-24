import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001';

interface PDFExportButtonProps {
  className?: string;
}

export const PDFExportButton: React.FC<PDFExportButtonProps> = ({ className = '' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/pdf`, {
        responseType: 'blob',
        timeout: 60000, // 60 second timeout for PDF generation
      });

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bulgaria_investment_report_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Error exporting PDF:', err);
      setError(err.response?.data?.detail || err.message || 'Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleExport}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-bulgaria-green text-white rounded-lg hover:bg-bulgaria-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Export PDF Report</span>
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

