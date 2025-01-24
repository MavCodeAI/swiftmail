import { Shield, Zap, RefreshCcw } from "lucide-react";

export function Features() {
  return (
    <div className="relative overflow-hidden py-20 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Secure & Private */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative">
              <Shield className="h-8 w-8 text-purple-500 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                End-to-end encryption keeps your communications safe and private.
              </p>
            </div>
          </div>

          {/* Instant Access */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative">
              <Zap className="h-8 w-8 text-purple-500 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Instant Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No registration required. Get your temporary email in seconds.
              </p>
            </div>
          </div>

          {/* Auto Refresh */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative">
              <RefreshCcw className="h-8 w-8 text-purple-500 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Auto Refresh
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Messages appear automatically. No manual refresh needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
