import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (actionUrl?: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' ? true : !n.isRead
  );

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'application_update':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'scheme_deadline':
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case 'civiai_recommendation':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'local_announcement':
        return <AlertCircle className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D1117] border-l border-white/10 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#11161D]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Civic Notifications</h3>
                <p className="text-xs text-[#A8B2C1]">Deadlines, application updates & alerts</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/5 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls Bar */}
          <div className="px-4 py-2.5 border-b border-white/5 bg-[#080B10] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 bg-[#151B23] p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'text-[#A8B2C1] hover:text-white'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                  filter === 'unread' ? 'bg-blue-600 text-white' : 'text-[#A8B2C1] hover:text-white'
                }`}
              >
                Unread ({notifications.filter(n => !n.isRead).length})
              </button>
            </div>

            <button
              onClick={onMarkAllRead}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-white/30 mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-white">You are all caught up</p>
                <p className="text-xs text-[#A8B2C1] mt-1">No unread notifications right now.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    if (notif.actionUrl) {
                      onSelectNotification(notif.actionUrl);
                      onClose();
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                    notif.isRead
                      ? 'bg-[#11161D]/50 border-white/5 hover:border-white/10 opacity-75'
                      : 'bg-[#11161D] border-blue-500/30 hover:border-blue-400 shadow-md shadow-blue-950/20'
                  }`}
                >
                  {!notif.isRead && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 pr-3">
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-[#A8B2C1] mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-[#667085]">
                        <span>{notif.timestamp}</span>
                        {notif.actionUrl && (
                          <span className="text-blue-400 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                            View details <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#080B10] border-t border-white/5 text-center text-xs text-[#667085]">
            Notifications synchronized with National & State databases
          </div>

        </div>
      </div>
    </div>
  );
};
