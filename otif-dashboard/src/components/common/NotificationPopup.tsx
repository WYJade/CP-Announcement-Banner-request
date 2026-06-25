import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Bell } from 'lucide-react'

export default function NotificationPopup() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already dismissed this session
    const wasDismissed = sessionStorage.getItem('notification-popup-dismissed')
    if (wasDismissed) {
      setDismissed(true)
      return
    }

    // Auto-show after 5 seconds delay
    const timer = setTimeout(() => {
      setVisible(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('notification-popup-dismissed', 'true')
  }

  const handleViewAll = () => {
    navigate('/messages')
    handleClose()
  }

  if (dismissed || !visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
            <Bell size={14} className="text-red-600" />
          </div>
          <span className="text-sm font-semibold text-gray-900">新消息通知</span>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-700 leading-relaxed">
          ⚠️ 安全提醒：检测到您的账号在异常设备登录（美国·迈阿密 03:42）。另有 120 个订单卡滞需关注。
        </p>
        <p className="text-xs text-gray-400 mt-2">刚刚</p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <button
          onClick={handleViewAll}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          查看全部消息
        </button>
      </div>
    </div>
  )
}
