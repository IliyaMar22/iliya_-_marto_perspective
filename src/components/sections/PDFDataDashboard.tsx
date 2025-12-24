import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Presentation, ExternalLink } from 'lucide-react';

const PDFDataDashboard: React.FC = () => {
  const [showPDF, setShowPDF] = useState(true);

  const pdfUrl = '/Sustainable-Growth-and-Competitiveness.pdf';
  const pptxUrl = '/Sustainable-Growth-and-Competitiveness.pptx';

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-lime-400 to-green-600 text-dark-green py-12 lg:py-16 shadow-lg"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                📄 Perspective for Bulgaria
              </h1>
              <p className="text-lg lg:text-xl opacity-90">
                Sustainable Growth and Competitiveness
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href={pdfUrl}
                download="Sustainable-Growth-and-Competitiveness.pdf"
                className="flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
              <a
                href={pptxUrl}
                download="Sustainable-Growth-and-Competitiveness.pptx"
                className="flex items-center gap-2 px-6 py-3 bg-dark-green text-lime-400 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md"
              >
                <Presentation className="w-5 h-5" />
                Download PPTX
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-lime-400" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Presentation Document
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  View the presentation inline or download for offline access
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPDF(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showPDF
                    ? 'bg-lime-400 text-dark-green'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                View PDF
              </button>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-300"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </a>
            </div>
          </div>

          {/* PDF Viewer */}
          {showPDF && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700"
              style={{ height: 'calc(100vh - 400px)', minHeight: '600px' }}
            >
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full"
                title="Sustainable Growth and Competitiveness PDF"
                style={{ border: 'none' }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Document Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* About Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">ℹ️</span>
              About This Document
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This presentation provides comprehensive insights into Bulgaria's path toward sustainable economic
              growth and enhanced competitiveness in the European and global markets.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Format:</span>
                <span className="text-gray-600 dark:text-gray-400">PDF, PowerPoint (PPTX)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Source:</span>
                <span className="text-gray-600 dark:text-gray-400">Bulgarian National Statistical Institute</span>
              </div>
            </div>
          </div>

          {/* Key Topics Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📌</span>
              Key Topics Covered
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">✓</span>
                <span>Economic Growth Strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">✓</span>
                <span>Competitiveness Analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">✓</span>
                <span>Investment Climate Overview</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">✓</span>
                <span>Regional Development Metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">✓</span>
                <span>EU Integration Progress</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">✓</span>
                <span>Sustainable Development Goals</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PDFDataDashboard;
