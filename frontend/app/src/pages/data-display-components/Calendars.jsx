import { useState } from 'react'

export function Calendars({ onNavigateHome }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})

  const handleTabChange = (key, tab) => {
    setActiveTabs(prev => ({ ...prev, [key]: tab }))
  }

  const handleCodeTypeChange = (key, type) => {
    setCodeTypes(prev => ({ ...prev, [key]: type }))
  }

  // 面包屑导航组件
  const Breadcrumb = () => (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <button 
              onClick={onNavigateHome}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="sr-only">首页</span>
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <button 
              onClick={onNavigateHome}
              className="ml-4 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              数据展示组件
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-900">日历</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // 渲染 Month Calendar 组件
  const renderMonthCalendar = () => {
    const upcomingMeetings = [
      {
        id: 1,
        title: "Design Review",
        time: "9:00 AM",
        duration: "1h 30m",
        participants: [
          { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces" },
          { name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1494790108755-2616b2913d17?w=32&h=32&fit=crop&crop=faces" },
          { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces" }
        ],
        color: "bg-blue-100 text-blue-800 border-blue-200"
      },
      {
        id: 2,
        title: "Client Presentation",
        time: "2:00 PM",
        duration: "45m",
        participants: [
          { name: "Mike Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces" },
          { name: "Sarah Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces" }
        ],
        color: "bg-green-100 text-green-800 border-green-200"
      },
      {
        id: 3,
        title: "Team Standup",
        time: "10:00 AM",
        duration: "30m",
        participants: [
          { name: "Tom Brown", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=faces" },
          { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=faces" },
          { name: "David Park", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=faces" },
          { name: "Emma White", avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=32&h=32&fit=crop&crop=faces" }
        ],
        color: "bg-purple-100 text-purple-800 border-purple-200"
      }
    ];

    const calendarEvents = [
      { date: 8, title: "Design Review", color: "bg-blue-500", participants: 3 },
      { date: 12, title: "Client Call", color: "bg-green-500", participants: 2 },
      { date: 15, title: "Team Standup", color: "bg-purple-500", participants: 4 },
      { date: 18, title: "Project Review", color: "bg-orange-500", participants: 5 },
      { date: 22, title: "Planning", color: "bg-pink-500", participants: 3 },
      { date: 25, title: "Demo Day", color: "bg-indigo-500", participants: 8 }
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-[700px]">
          {/* Left Sidebar - Upcoming Meetings */}
          <div className="w-80 bg-gray-50/50 border-r border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
                      {meeting.title}
                    </h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      {meeting.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {meeting.participants.slice(0, 3).map((participant, index) => (
                        <img
                          key={index}
                          className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                          src={participant.avatar}
                          alt={participant.name}
                          title={participant.name}
                        />
                      ))}
                      {meeting.participants.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center ring-1 ring-gray-200">
                          <span className="text-xs text-gray-600 font-medium">+{meeting.participants.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {meeting.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Schedule Meeting
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Calendar Settings
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Calendar Grid */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">November 2023</h2>
                <div className="flex items-center space-x-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">
                  Today
                </button>
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">
                    Month
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Week
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Day
                  </button>
                </div>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = i - 2; // Start from Oct 29
                  const isCurrentMonth = date > 0 && date <= 30;
                  const isToday = date === 15;
                  const dayEvents = calendarEvents.filter(event => event.date === date);
                  
                  return (
                    <div key={i} className={`
                      p-3 min-h-[120px] border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50/50 transition-colors cursor-pointer relative
                      ${!isCurrentMonth ? 'bg-gray-50/30 text-gray-400' : 'bg-white text-gray-900'}
                    `}>
                      <div className={`
                        text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors
                        ${isToday ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                      `}>
                        {date > 0 ? date : date + 31}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.map((event, eventIndex) => (
                          <div key={eventIndex} className="relative">
                            <div className={`
                              text-xs px-2 py-1 rounded-md truncate text-white font-medium
                              ${event.color} hover:shadow-sm transition-all cursor-pointer
                            `}>
                              <div className="truncate">{event.title}</div>
                            </div>
                            
                            {/* Participant avatars */}
                            <div className="flex -space-x-1 mt-1">
                              {Array.from({ length: Math.min(event.participants, 4) }, (_, i) => (
                                <div key={i} className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                              ))}
                              {event.participants > 4 && (
                                <div className="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-600 font-medium">+</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 渲染 Week Calendar 组件 - 深色主题时间轴布局
  const renderWeekCalendar = () => {
    const timeSlots = [
      '8:00', '9:00', '10:00', '11:00', '12:00', 
      '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'
    ];

    const weekEvents = [
      { day: 'Mon', time: '9:00', duration: 2, title: 'Team Meeting', color: 'bg-blue-900', participants: ['JD', 'SM'] },
      { day: 'Tue', time: '10:00', duration: 1, title: 'Client Call', color: 'bg-green-900', participants: ['MW'] },
      { day: 'Wed', time: '2:00', duration: 3, title: 'Design Workshop', color: 'bg-purple-900', participants: ['TB', 'LC', 'DP'] },
      { day: 'Thu', time: '11:00', duration: 1, title: 'Code Review', color: 'bg-orange-900', participants: ['EW', 'JD'] },
      { day: 'Fri', time: '3:00', duration: 2, title: 'Project Demo', color: 'bg-pink-900', participants: ['SM', 'MW', 'TB'] }
    ];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = ['12', '13', '14', '15', '16', '17', '18'];

    return (
      <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-white">Week View</h2>
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-gray-300 text-sm font-medium">Nov 12 - Nov 18, 2023</span>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 rounded-lg transition-colors">
                Today
              </button>
              <div className="flex bg-gray-800 rounded-xl p-1">
                <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  Month
                </button>
                <button className="px-4 py-2 text-sm bg-gray-700 text-white rounded-lg font-medium">
                  Week
                </button>
                <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  Day
                </button>
              </div>
            </div>
          </div>

          {/* Week Grid */}
          <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            {/* Days Header */}
            <div className="grid grid-cols-8 border-b border-gray-700">
              <div className="p-4 bg-gray-800"></div> {/* Time column header */}
              {days.map((day, index) => (
                <div key={day} className="p-4 text-center border-r border-gray-700 last:border-r-0">
                  <div className="text-sm font-medium text-gray-300">{day}</div>
                  <div className={`
                    text-lg font-bold mt-1 w-8 h-8 flex items-center justify-center rounded-full mx-auto
                    ${index === 3 ? 'bg-blue-600 text-white' : 'text-white'}
                  `}>
                    {dates[index]}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 border-b border-gray-700/50 last:border-b-0">
                  {/* Time Label */}
                  <div className="p-4 bg-gray-800 border-r border-gray-700 text-center">
                    <span className="text-sm font-medium text-gray-400">{time}</span>
                  </div>
                  
                  {/* Day Columns */}
                  {days.map((day, dayIndex) => {
                    const dayEvent = weekEvents.find(event => 
                      event.day === day && event.time === time
                    );
                    
                    return (
                      <div key={`${day}-${time}`} className="relative h-16 border-r border-gray-700/30 last:border-r-0 hover:bg-gray-800/50 transition-colors">
                        {dayEvent && (
                          <div 
                            className={`
                              absolute inset-x-1 rounded-lg p-2 shadow-lg top-0
                              ${dayEvent.color} text-white cursor-pointer hover:shadow-xl transition-all hover:brightness-110
                            `}
                            style={{ 
                              height: `${dayEvent.duration * 4}rem`,
                              zIndex: 10
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0 pr-1">
                                <h4 className="text-xs font-semibold truncate leading-tight">
                                  {dayEvent.title}
                                </h4>
                                <p className="text-xs opacity-90 mt-1">
                                  {dayEvent.time} - {parseInt(dayEvent.time) + dayEvent.duration}:00
                                </p>
                              </div>
                              <div className="flex -space-x-1 shrink-0">
                                {dayEvent.participants.slice(0, 2).map((participant, pIndex) => (
                                  <div 
                                    key={pIndex}
                                    className="w-4 h-4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
                                    title={participant}
                                  >
                                    <span className="text-xs font-medium text-white">
                                      {participant.charAt(0)}
                                    </span>
                                  </div>
                                ))}
                                {dayEvent.participants.length > 2 && (
                                  <div className="w-4 h-4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                                    <span className="text-xs font-medium text-white">+{dayEvent.participants.length - 2}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Current Time Indicator */}
          <div className="relative -mt-2 pointer-events-none">
            <div className="absolute left-20 right-4" style={{ top: '180px' }}>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1 h-0.5 bg-red-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 渲染 Year Calendar 组件 - 多月网格布局
  const renderYearCalendar = () => {
    const monthsData = [
      { name: 'January', days: 31, startDay: 0, events: [8, 15, 22] },
      { name: 'February', days: 28, startDay: 3, events: [5, 14, 25] },
      { name: 'March', days: 31, startDay: 3, events: [10, 18, 28] },
      { name: 'April', days: 30, startDay: 6, events: [3, 12, 24] },
      { name: 'May', days: 31, startDay: 1, events: [7, 16, 29] },
      { name: 'June', days: 30, startDay: 4, events: [2, 20, 27] },
      { name: 'July', days: 31, startDay: 6, events: [4, 13, 25] },
      { name: 'August', days: 31, startDay: 2, events: [9, 17, 31] },
      { name: 'September', days: 30, startDay: 5, events: [6, 14, 23] },
      { name: 'October', days: 31, startDay: 0, events: [11, 19, 26] },
      { name: 'November', days: 30, startDay: 3, events: [8, 15, 22] },
      { name: 'December', days: 31, startDay: 5, events: [5, 12, 24] }
    ];

    const generateDaysArray = (month) => {
      const days = [];
      const totalCells = 42; // 6 rows × 7 days
      
      // Add empty cells for days before month starts
      for (let i = 0; i < month.startDay; i++) {
        days.push(null);
      }
      
      // Add days of the month
      for (let day = 1; day <= month.days; day++) {
        days.push(day);
      }
      
      // Fill remaining cells
      while (days.length < totalCells) {
        days.push(null);
      }
      
      return days;
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-900">2023</h2>
            <div className="flex items-center space-x-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">
              Today
            </button>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Month
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Week
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Day
              </button>
              <button className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">
                Year
              </button>
            </div>
          </div>
        </div>

        {/* Year Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {monthsData.map((month, monthIndex) => {
            const days = generateDaysArray(month);
            const today = monthIndex === 10 && 15; // November 15th as today
            
            return (
              <div key={month.name} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer group">
                {/* Month Header */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                    {month.name}
                  </h3>
                </div>
                
                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 p-1">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, dayIndex) => {
                    const hasEvent = day && month.events.includes(day);
                    const isToday = day === today;
                    
                    return (
                      <div key={dayIndex} className="relative">
                        {day ? (
                          <button 
                            className={`
                              w-8 h-8 text-xs font-medium rounded-lg transition-all flex items-center justify-center relative
                              ${isToday 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : hasEvent 
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                                  : 'text-gray-700 hover:bg-white hover:shadow-sm'
                              }
                            `}
                          >
                            {day}
                            {hasEvent && !isToday && (
                              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            )}
                          </button>
                        ) : (
                          <div className="w-8 h-8"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Event Count */}
                {month.events.length > 0 && (
                  <div className="mt-3 text-center">
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                      {month.events.length} event{month.events.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Year Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {monthsData.reduce((total, month) => total + month.events.length, 0)}
              </div>
              <div className="text-sm text-blue-800 font-medium">Total Events</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-green-800 font-medium">Active Months</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(monthsData.reduce((total, month) => total + month.events.length, 0) / 12 * 10) / 10}
              </div>
              <div className="text-sm text-purple-800 font-medium">Avg Events/Month</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 渲染 Day Calendar 组件 - 侧边日历选择器和详细时间安排
  const renderDayCalendar = () => {
    const timeSlots = Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:00 ${ampm}`;
    });

    const dayEvents = [
      { 
        time: '9:00 AM', 
        endTime: '10:30 AM',
        title: 'Morning Standup', 
        description: 'Daily team sync and planning session',
        color: 'bg-blue-400',
        participants: [
          { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces' },
          { name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2913d17?w=32&h=32&fit=crop&crop=faces' }
        ],
        location: 'Conference Room A'
      },
      { 
        time: '11:00 AM', 
        endTime: '12:00 PM',
        title: 'Client Presentation', 
        description: 'Present Q4 results and discuss future strategy',
        color: 'bg-green-400',
        participants: [
          { name: 'Mike Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces' },
          { name: 'Sarah Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces' }
        ],
        location: 'Zoom Meeting'
      },
      { 
        time: '2:00 PM', 
        endTime: '3:30 PM',
        title: 'Design Workshop', 
        description: 'Collaborate on new product features and user experience',
        color: 'bg-purple-400',
        participants: [
          { name: 'Tom Brown', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=faces' },
          { name: 'Lisa Chen', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=faces' },
          { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=faces' }
        ],
        location: 'Design Studio'
      },
      { 
        time: '4:00 PM', 
        endTime: '5:00 PM',
        title: 'Code Review', 
        description: 'Review pull requests and discuss technical improvements',
        color: 'bg-orange-400',
        participants: [
          { name: 'Emma White', avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=32&h=32&fit=crop&crop=faces' }
        ],
        location: 'Dev Room'
      }
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-[800px]">
          {/* Left Sidebar - Mini Calendar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">November 2023</h3>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Mini Calendar */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 p-1">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = i - 2;
                    const isCurrentMonth = date > 0 && date <= 30;
                    const isToday = date === 15;
                    const hasEvent = [8, 12, 15, 22, 28].includes(date);
                    
                    return (
                      <button 
                        key={i}
                        className={`
                          w-8 h-8 text-xs font-medium rounded-lg transition-all flex items-center justify-center relative
                          ${isToday 
                            ? 'bg-blue-600 text-white' 
                            : isCurrentMonth 
                              ? hasEvent 
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                                : 'text-gray-700 hover:bg-gray-100'
                              : 'text-gray-400'
                          }
                        `}
                      >
                        {date > 0 ? date : date + 31}
                        {hasEvent && !isToday && (
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Today's Events Summary */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Today's Events</h4>
              <div className="space-y-2">
                {dayEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full text-left p-3 rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium">
                  View all events
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-medium">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    New Event
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View Calendar
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Day Schedule */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Thursday, November 15</h2>
                    <p className="text-gray-600">4 events scheduled</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Today
                  </button>
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Month
                    </button>
                    <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Week
                    </button>
                    <button className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">
                      Day
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Schedule */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative">
                {/* Current Time Indicator */}
                <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top: '420px' }}>
                  <div className="flex items-center px-6">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1 h-0.5 bg-red-500"></div>
                    <span className="text-xs text-red-500 font-medium ml-2">10:30 AM</span>
                  </div>
                </div>

                {/* Time Slots and Events */}
                <div className="space-y-0">
                  {timeSlots.map((time) => {
                    const currentEvent = dayEvents.find(event => event.time === time);
                    
                    return (
                      <div key={time} className="relative border-b border-gray-100 last:border-b-0">
                        <div className="flex">
                          {/* Time Label */}
                          <div className="w-20 p-4 text-sm text-gray-500 font-medium text-right border-r border-gray-100">
                            {time}
                          </div>
                          
                          {/* Event Area */}
                          <div className="flex-1 min-h-[60px] relative">
                            {currentEvent ? (
                              <div className="m-2">
                                <div className={`
                                  rounded-lg p-4 text-white shadow-sm border-l-4 border-white/30 relative
                                  ${currentEvent.color} hover:shadow-md transition-all cursor-pointer hover:brightness-110
                                `}>
                                  {/* Avatars in top right corner */}
                                  <div className="absolute top-3 right-3 flex -space-x-1">
                                    {currentEvent.participants.slice(0, 3).map((participant, pIndex) => (
                                      <img
                                        key={pIndex}
                                        className="w-8 h-8 rounded-full border-2 border-white/30"
                                        src={participant.avatar}
                                        alt={participant.name}
                                        title={participant.name}
                                      />
                                    ))}
                                    {currentEvent.participants.length > 3 && (
                                      <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                                        <span className="text-xs font-medium text-white">+{currentEvent.participants.length - 3}</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="pr-20">
                                    <h4 className="font-semibold text-white truncate">{currentEvent.title}</h4>
                                    <p className="text-white/90 text-sm mb-2">{currentEvent.time} - {currentEvent.endTime}</p>
                                  </div>
                                  <p className="text-white/80 text-sm mb-2">{currentEvent.description}</p>
                                  <div className="flex items-center text-white/70 text-sm">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {currentEvent.location}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="hover:bg-gray-50 transition-colors h-full flex items-center px-4">
                                <button className="text-gray-400 hover:text-gray-600 text-sm">
                                  + Add event
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 渲染 Meeting Booking Calendar 组件 - 预约界面
  const renderMeetingBookingCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(15);
    const [selectedTime, setSelectedTime] = useState('1:00 PM');
    const [meetingType, setMeetingType] = useState('consultation');

    const availableTimes = [
      { time: '9:00 AM', available: true, duration: '30 min' },
      { time: '9:30 AM', available: false, duration: '30 min' },
      { time: '10:00 AM', available: true, duration: '30 min' },
      { time: '10:30 AM', available: true, duration: '30 min' },
      { time: '11:00 AM', available: false, duration: '30 min' },
      { time: '11:30 AM', available: true, duration: '30 min' },
      { time: '1:00 PM', available: true, duration: '60 min' },
      { time: '1:30 PM', available: false, duration: '30 min' },
      { time: '2:00 PM', available: true, duration: '30 min' },
      { time: '2:30 PM', available: true, duration: '30 min' },
      { time: '3:00 PM', available: true, duration: '45 min' },
      { time: '4:00 PM', available: true, duration: '30 min' }
    ];

    const meetingTypes = [
      { id: 'consultation', name: 'Consultation', duration: '30 min', price: 'Free', color: 'bg-blue-100 text-blue-800' },
      { id: 'demo', name: 'Product Demo', duration: '45 min', price: 'Free', color: 'bg-green-100 text-green-800' },
      { id: 'strategy', name: 'Strategy Session', duration: '60 min', price: '$99', color: 'bg-purple-100 text-purple-800' },
      { id: 'technical', name: 'Technical Review', duration: '90 min', price: '$149', color: 'bg-orange-100 text-orange-800' }
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-[700px]">
          {/* Left Sidebar - Meeting Details */}
          <div className="w-96 bg-gray-50 border-r border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Book a Meeting</h3>
              <p className="text-sm text-gray-600">Choose a meeting type and available time slot</p>
            </div>

            {/* Meeting Types */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Meeting Type</h4>
              <div className="space-y-3">
                {meetingTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setMeetingType(type.id)}
                    className={`
                      w-full text-left p-4 rounded-lg border-2 transition-all
                      ${meetingType === type.id
                        ? 'border-blue-300 bg-blue-50 ring-1 ring-blue-300'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{type.name}</h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${type.color}`}>
                        {type.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{type.duration} session</p>
                    <div className="text-xs text-gray-500">
                      {type.id === 'consultation' && 'Initial consultation and needs assessment'}
                      {type.id === 'demo' && 'Walkthrough of features and capabilities'}
                      {type.id === 'strategy' && 'Deep dive into your business strategy'}
                      {type.id === 'technical' && 'Technical architecture and implementation'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces"
                  alt="John Doe"
                />
                <div>
                  <h4 className="font-medium text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">Senior Consultant</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                10+ years experience helping businesses scale and optimize their operations.
              </p>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9 (127 reviews)
                </div>
                <div>
                  📍 San Francisco, CA
                </div>
              </div>
            </div>
          </div>

          {/* Center - Calendar */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
                <div className="flex items-center space-x-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-900 px-3">November 2023</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = i - 2;
                    const isCurrentMonth = date > 0 && date <= 30;
                    const isAvailable = isCurrentMonth && [8, 9, 12, 13, 15, 16, 19, 20, 22, 23, 26, 27].includes(date);
                    const isSelected = date === selectedDate;
                    const isPast = isCurrentMonth && date < 8;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => isAvailable && setSelectedDate(date)}
                        disabled={!isAvailable || isPast}
                        className={`
                          p-4 min-h-[60px] border-r border-b border-gray-200 last:border-r-0 transition-all 
                          flex flex-col items-center justify-center
                          ${!isCurrentMonth 
                            ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                            : isPast
                              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                              : isSelected
                                ? 'bg-blue-600 text-white'
                                : isAvailable
                                  ? 'bg-white text-gray-900 hover:bg-blue-50 cursor-pointer'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }
                        `}
                      >
                        <div className="font-medium">{date > 0 ? date : date + 31}</div>
                        {isAvailable && !isSelected && (
                          <div className="mt-1 text-xs text-green-600">Available</div>
                        )}
                        {isSelected && (
                          <div className="mt-1 text-xs text-blue-100">Selected</div>
                        )}
                        {isCurrentMonth && !isAvailable && !isPast && (
                          <div className="mt-1 text-xs text-gray-500">Unavailable</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Available Times */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Times - {selectedDate ? `November ${selectedDate}` : 'Select a date'}
              </h3>
              
              {selectedDate ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTimes.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`
                        p-3 rounded-lg border-2 text-center transition-all
                        ${!slot.available
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTime === slot.time
                            ? 'border-blue-300 bg-blue-50 text-blue-800 ring-1 ring-blue-300'
                            : 'border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50'
                        }
                      `}
                    >
                      <div className="font-medium text-sm">{slot.time}</div>
                      <div className="text-xs mt-1">
                        {slot.available ? slot.duration : 'Booked'}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">Please select a date to view available time slots</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Booking Summary */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Meeting Type:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {meetingTypes.find(t => t.id === meetingType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {meetingTypes.find(t => t.id === meetingType)?.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Date:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedDate ? `Nov ${selectedDate}, 2023` : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Time:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedTime}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-sm font-medium text-gray-900">Total:</span>
                  <span className="text-sm font-bold text-gray-900">
                    {meetingTypes.find(t => t.id === meetingType)?.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                disabled={!selectedDate}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Book Meeting
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Save for Later
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">Meeting Details:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Video call via Zoom</li>
                <li>• Calendar invite will be sent</li>
                <li>• Free rescheduling up to 24hrs before</li>
                <li>• Meeting recording available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderComponent = (key, Component, title) => (
    <div key={key} style={{marginBottom: '56px'}}>
      <div style={{marginBottom: '24px'}}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>{title}</h2>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleTabChange(key, 'preview')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                (activeTabs[key] || 'preview') === 'preview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => handleTabChange(key, 'code')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                (activeTabs[key] || 'preview') === 'code'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Code
            </button>
          </div>
        </div>
      </div>

      {(activeTabs[key] || 'preview') === 'preview' ? (
        <div><Component /></div>
      ) : (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handleCodeTypeChange(key, 'react')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                (codeTypes[key] || 'react') === 'react'
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              React
            </button>
            <button
              onClick={() => handleCodeTypeChange(key, 'html')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                (codeTypes[key] || 'react') === 'html'
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              HTML
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100" style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
            }}>
{(() => {
                const getComponentCode = (componentKey) => {
                  const reactCodes = {
                    'monthView': `export default function MonthCalendar() {
  const upcomingMeetings = [
    {
      id: 1,
      title: "Design Review",
      time: "9:00 AM",
      duration: "1h 30m",
      participants: [
        { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces" },
        { name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1494790108755-2616b2913d17?w=32&h=32&fit=crop&crop=faces" },
        { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces" }
      ],
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "2:00 PM",
      duration: "45m",
      participants: [
        { name: "Mike Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces" },
        { name: "Sarah Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces" }
      ],
      color: "bg-green-100 text-green-800 border-green-200"
    },
    {
      id: 3,
      title: "Team Standup",
      time: "10:00 AM",
      duration: "30m",
      participants: [
        { name: "Tom Brown", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=faces" },
        { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=faces" },
        { name: "David Park", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=faces" },
        { name: "Emma White", avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=32&h=32&fit=crop&crop=faces" }
      ],
      color: "bg-purple-100 text-purple-800 border-purple-200"
    }
  ];

  const calendarEvents = [
    { date: 8, title: "Design Review", color: "bg-blue-500", participants: 3 },
    { date: 12, title: "Client Call", color: "bg-green-500", participants: 2 },
    { date: 15, title: "Team Standup", color: "bg-purple-500", participants: 4 },
    { date: 18, title: "Project Review", color: "bg-orange-500", participants: 5 },
    { date: 22, title: "Planning", color: "bg-pink-500", participants: 3 },
    { date: 25, title: "Demo Day", color: "bg-indigo-500", participants: 8 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex h-[700px]">
        {/* Left Sidebar - Upcoming Meetings */}
        <div className="w-80 bg-gray-50/50 border-r border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
                    {meeting.title}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {meeting.time}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {meeting.participants.slice(0, 3).map((participant, index) => (
                      <img
                        key={index}
                        className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                        src={participant.avatar}
                        alt={participant.name}
                        title={participant.name}
                      />
                    ))}
                    {meeting.participants.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center ring-1 ring-gray-200">
                        <span className="text-xs text-gray-600 font-medium">+{meeting.participants.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {meeting.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Schedule Meeting
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Calendar Settings
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - Calendar Grid */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">November 2023</h2>
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">
                Today
              </button>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">
                  Month
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Week
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Day
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {Array.from({ length: 35 }, (_, i) => {
                const date = i - 2;
                const isCurrentMonth = date > 0 && date <= 30;
                const isToday = date === 15;
                const dayEvents = calendarEvents.filter(event => event.date === date);
                
                return (
                  <div key={i} className={\`
                    p-3 min-h-[120px] border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50/50 transition-colors cursor-pointer relative
                    \${!isCurrentMonth ? 'bg-gray-50/30 text-gray-400' : 'bg-white text-gray-900'}
                  \`}>
                    <div className={\`
                      text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors
                      \${isToday ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                    \`}>
                      {date > 0 ? date : date + 31}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.map((event, eventIndex) => (
                        <div key={eventIndex} className="relative">
                          <div className={\`
                            text-xs px-2 py-1 rounded-md truncate text-white font-medium
                            \${event.color} hover:shadow-sm transition-all cursor-pointer
                          \`}>
                            <div className="truncate">{event.title}</div>
                          </div>
                          
                          {/* Participant avatars */}
                          <div className="flex -space-x-1 mt-1">
                            {Array.from({ length: Math.min(event.participants, 4) }, (_, i) => (
                              <div key={i} className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                              </div>
                            ))}
                            {event.participants > 4 && (
                              <div className="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-600 font-medium">+</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
                    'weekView': `export default function WeekCalendar() {
  const weekEvents = [
    { day: 'Mon', time: '9:00', duration: 2, title: 'Team Meeting', color: 'bg-blue-900' },
    { day: 'Tue', time: '10:00', duration: 1, title: 'Client Call', color: 'bg-green-900' }
  ];

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Week View</h2>
          <div className="flex bg-gray-800 rounded-xl p-1">
            <button className="px-4 py-2 text-sm bg-gray-700 text-white rounded-lg font-medium">
              Week
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <div className="grid grid-cols-8 border-b border-gray-700">
            <div className="p-4 bg-gray-800"></div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="p-4 text-center border-r border-gray-700 last:border-r-0">
                <div className="text-sm font-medium text-gray-300">{day}</div>
                <div className="text-lg font-bold mt-1 text-white">{12 + index}</div>
              </div>
            ))}
          </div>
          
          {/* Time slots with events */}
          <div className="relative">
            {['8:00', '9:00', '10:00', '11:00', '12:00'].map((time) => (
              <div key={time} className="grid grid-cols-8 border-b border-gray-700/50">
                <div className="p-4 bg-gray-800 border-r border-gray-700 text-center">
                  <span className="text-sm font-medium text-gray-400">{time}</span>
                </div>
                {/* Event blocks positioned absolutely */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
                    'yearView': `export default function YearCalendar() {
  const monthsData = [
    { name: 'January', days: 31, startDay: 0, events: [8, 15, 22] },
    { name: 'February', days: 28, startDay: 3, events: [5, 14, 25] }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">2023</h2>
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {monthsData.map((month) => (
          <div key={month.name} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{month.name}</h3>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 p-1">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Calendar days with events */}
            </div>
          </div>
        ))}
      </div>

      {/* Year Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">36</div>
            <div className="text-sm text-blue-800 font-medium">Total Events</div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
                    'dayView': `export default function DayCalendar() {
  const dayEvents = [
    {
      time: '9:00 AM',
      endTime: '10:30 AM',
      title: 'Morning Standup',
      description: 'Daily team sync and planning session',
      color: 'bg-blue-400',
      participants: [
        { name: 'John Doe', avatar: '...' }
      ],
      location: 'Conference Room A'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex h-[800px]">
        {/* Left Sidebar - Mini Calendar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">November 2023</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {/* Mini calendar grid */}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Today's Events</h4>
            <div className="space-y-2">
              {dayEvents.slice(0, 3).map((event, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={\`w-3 h-3 rounded-full \${event.color}\`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Day Schedule */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Thursday, November 15</h2>
                <p className="text-gray-600">4 events scheduled</p>
              </div>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">
                  Day
                </button>
              </div>
            </div>
          </div>

          {/* Time Schedule */}
          <div className="flex-1 overflow-y-auto">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="relative border-b border-gray-100">
                <div className="flex">
                  <div className="w-20 p-4 text-sm text-gray-500 font-medium text-right border-r border-gray-100">
                    {i}:00
                  </div>
                  <div className="flex-1 min-h-[60px] relative">
                    {/* Event blocks positioned absolutely */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
                    'meetingBooking': `export default function MeetingBookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('1:00 PM');
  const [meetingType, setMeetingType] = useState('consultation');

  const meetingTypes = [
    { id: 'consultation', name: 'Consultation', duration: '30 min', price: 'Free' },
    { id: 'demo', name: 'Product Demo', duration: '45 min', price: 'Free' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex h-[700px]">
        {/* Left Sidebar - Meeting Details */}
        <div className="w-96 bg-gray-50 border-r border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Book a Meeting</h3>
            <p className="text-sm text-gray-600">Choose a meeting type and available time slot</p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Meeting Type</h4>
            <div className="space-y-3">
              {meetingTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setMeetingType(type.id)}
                  className={\`w-full text-left p-4 rounded-lg border-2 transition-all
                    \${meetingType === type.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}\`}
                >
                  <h5 className="font-medium text-gray-900">{type.name}</h5>
                  <p className="text-sm text-gray-600">{type.duration} session</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Calendar */}
        <div className="flex-1 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Calendar grid for date selection */}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* Time slot buttons */}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Booking Summary */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
            {/* Booking details */}
          </div>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium">
              Book Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`
                  };

                  const htmlCodes = {
                    'monthView': `<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div class="flex h-[700px]">
    <!-- Left Sidebar - Upcoming Meetings -->
    <div class="w-80 bg-gray-50/50 border-r border-gray-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Upcoming</h3>
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View all
        </button>
      </div>
      
      <div class="space-y-4">
        <!-- Design Review Meeting -->
        <div class="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
          <div class="flex items-start justify-between mb-3">
            <h4 class="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
              Design Review
            </h4>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              9:00 AM
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex -space-x-2">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces" alt="John Doe" title="John Doe">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1494790108755-2616b2913d17?w=32&h=32&fit=crop&crop=faces" alt="Jane Smith" title="Jane Smith">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces" alt="Alex Johnson" title="Alex Johnson">
            </div>
            <span class="text-xs text-gray-500 font-medium">
              1h 30m
            </span>
          </div>
        </div>

        <!-- Client Presentation Meeting -->
        <div class="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
          <div class="flex items-start justify-between mb-3">
            <h4 class="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
              Client Presentation
            </h4>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              2:00 PM
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex -space-x-2">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces" alt="Mike Wilson" title="Mike Wilson">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces" alt="Sarah Davis" title="Sarah Davis">
            </div>
            <span class="text-xs text-gray-500 font-medium">
              45m
            </span>
          </div>
        </div>

        <!-- Team Standup Meeting -->
        <div class="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
          <div class="flex items-start justify-between mb-3">
            <h4 class="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
              Team Standup
            </h4>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              10:00 AM
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex -space-x-2">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=faces" alt="Tom Brown" title="Tom Brown">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=faces" alt="Lisa Chen" title="Lisa Chen">
              <img class="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200" src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=faces" alt="David Park" title="David Park">
              <div class="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center ring-1 ring-gray-200">
                <span class="text-xs text-gray-600 font-medium">+1</span>
              </div>
            </div>
            <span class="text-xs text-gray-500 font-medium">
              30m
            </span>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions Section -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h4 class="text-sm font-medium text-gray-900 mb-4">Quick Actions</h4>
        <div class="space-y-2">
          <button class="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Schedule Meeting
            </div>
          </button>
          <button class="w-full text-left p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Calendar Settings
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Right Content - Calendar Grid -->
    <div class="flex-1 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <h2 class="text-2xl font-bold text-gray-900">November 2023</h2>
          <div class="flex items-center space-x-1">
            <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">
            Today
          </button>
          <div class="flex bg-gray-100 rounded-xl p-1">
            <button class="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">
              Month
            </button>
            <button class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Week
            </button>
            <button class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Day
            </button>
          </div>
        </div>
      </div>
      
      <!-- Calendar Grid -->
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <!-- Header -->
        <div class="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          <div class="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Sun</div>
          <div class="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Mon</div>
          <div class="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Tue</div>
          <div class="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Wed</div>
          <div class="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Thu</div>
          <div class="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Fri</div>
          <div class="p-4 text-center text-sm font-semibold text-gray-700">Sat</div>
        </div>
        
        <!-- Calendar Days Grid -->
        <div class="grid grid-cols-7">
          <!-- Previous month days -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              29
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              30
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              31
            </div>
          </div>
          
          <!-- Current month days with events -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              1
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              2
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              3
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              4
            </div>
          </div>
          
          <!-- Week 2 -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              5
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              6
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              7
            </div>
          </div>
          <!-- Day 8 with Design Review event -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              8
            </div>
            <div class="space-y-1">
              <div class="relative">
                <div class="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-blue-500 hover:shadow-sm transition-all cursor-pointer">
                  <div class="truncate">Design Review</div>
                </div>
                <div class="flex -space-x-1 mt-1">
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              9
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              10
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              11
            </div>
          </div>
          
          <!-- Week 3 -->
          <!-- Day 12 with Client Call event -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              12
            </div>
            <div class="space-y-1">
              <div class="relative">
                <div class="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-green-500 hover:shadow-sm transition-all cursor-pointer">
                  <div class="truncate">Client Call</div>
                </div>
                <div class="flex -space-x-1 mt-1">
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              13
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              14
            </div>
          </div>
          <!-- Day 15 with Team Standup event (Today) -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors bg-blue-600 text-white">
              15
            </div>
            <div class="space-y-1">
              <div class="relative">
                <div class="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-purple-500 hover:shadow-sm transition-all cursor-pointer">
                  <div class="truncate">Team Standup</div>
                </div>
                <div class="flex -space-x-1 mt-1">
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <span class="text-xs text-gray-600 font-medium">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              16
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              17
            </div>
          </div>
          <!-- Day 18 with Project Review event -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              18
            </div>
            <div class="space-y-1">
              <div class="relative">
                <div class="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-orange-500 hover:shadow-sm transition-all cursor-pointer">
                  <div class="truncate">Project Review</div>
                </div>
                <div class="flex -space-x-1 mt-1">
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <span class="text-xs text-gray-600 font-medium">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Continue with more days... -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              19
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              20
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              21
            </div>
          </div>
          <!-- Day 22 with Planning event -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              22
            </div>
            <div class="space-y-1">
              <div class="relative">
                <div class="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-pink-500 hover:shadow-sm transition-all cursor-pointer">
                  <div class="truncate">Planning</div>
                </div>
                <div class="flex -space-x-1 mt-1">
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              23
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              24
            </div>
          </div>
          
          <!-- Day 25 with Demo Day event -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              25
            </div>
            <div class="space-y-1">
              <div class="relative">
                <div class="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-indigo-500 hover:shadow-sm transition-all cursor-pointer">
                  <div class="truncate">Demo Day</div>
                </div>
                <div class="flex -space-x-1 mt-1">
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                    <span class="text-xs text-gray-600 font-medium">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Remaining days -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              26
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              27
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              28
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              29
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              30
            </div>
          </div>
          
          <!-- Next month days -->
          <div class="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              1
            </div>
          </div>
          <div class="p-3 min-h-[120px] border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
            <div class="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              2
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
                    'weekView': `<div class="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-white">Week View</h2>
      <div class="flex bg-gray-800 rounded-xl p-1">
        <button class="px-4 py-2 text-sm bg-gray-700 text-white rounded-lg font-medium">Week</button>
      </div>
    </div>

    <div class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
      <!-- Week grid header -->
      <div class="grid grid-cols-8 border-b border-gray-700">
        <div class="p-4 bg-gray-800"></div>
        <div class="p-4 text-center border-r border-gray-700">
          <div class="text-sm font-medium text-gray-300">Mon</div>
          <div class="text-lg font-bold mt-1 text-white">12</div>
        </div>
        <!-- More day headers -->
      </div>
      
      <!-- Time slots -->
      <div class="relative">
        <div class="grid grid-cols-8 border-b border-gray-700/50">
          <div class="p-4 bg-gray-800 border-r border-gray-700 text-center">
            <span class="text-sm font-medium text-gray-400">9:00</span>
          </div>
          <!-- Event blocks positioned absolutely -->
        </div>
      </div>
    </div>
  </div>
</div>`,
                    'yearView': `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-3xl font-bold text-gray-900">2023</h2>
    <div class="flex bg-gray-100 rounded-xl p-1">
      <button class="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">Year</button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    <div class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer group">
      <div class="text-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">January</h3>
      </div>
      
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div class="text-center text-xs font-medium text-gray-500 p-1">S</div>
        <div class="text-center text-xs font-medium text-gray-500 p-1">M</div>
        <!-- More day headers -->
      </div>
      
      <div class="grid grid-cols-7 gap-1">
        <!-- Calendar days -->
      </div>
    </div>
    <!-- More months -->
  </div>

  <!-- Year Summary -->
  <div class="mt-8 pt-6 border-t border-gray-200">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="text-center p-4 bg-blue-50 rounded-xl">
        <div class="text-2xl font-bold text-blue-600">36</div>
        <div class="text-sm text-blue-800 font-medium">Total Events</div>
      </div>
    </div>
  </div>
</div>`,
                    'dayView': `<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div class="flex h-[800px]">
    <!-- Left Sidebar - Mini Calendar -->
    <div class="w-80 bg-gray-50 border-r border-gray-200 p-6">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">November 2023</h3>
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <!-- Mini calendar grid -->
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-900 mb-3">Today's Events</h4>
        <div class="space-y-2">
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full bg-blue-400"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">Morning Standup</p>
                <p class="text-xs text-gray-500">9:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Content - Day Schedule -->
    <div class="flex-1 flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Thursday, November 15</h2>
            <p class="text-gray-600">4 events scheduled</p>
          </div>
          <div class="flex bg-gray-100 rounded-xl p-1">
            <button class="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg shadow-sm font-medium">Day</button>
          </div>
        </div>
      </div>

      <!-- Time Schedule -->
      <div class="flex-1 overflow-y-auto">
        <div class="relative border-b border-gray-100">
          <div class="flex">
            <div class="w-20 p-4 text-sm text-gray-500 font-medium text-right border-r border-gray-100">9:00 AM</div>
            <div class="flex-1 min-h-[60px] relative">
              <!-- Event blocks positioned absolutely -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
                    'meetingBooking': `<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div class="flex h-[700px]">
    <!-- Left Sidebar - Meeting Details -->
    <div class="w-96 bg-gray-50 border-r border-gray-200 p-6">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Book a Meeting</h3>
        <p class="text-sm text-gray-600">Choose a meeting type and available time slot</p>
      </div>

      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-900 mb-3">Meeting Type</h4>
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-lg border-2 border-blue-300 bg-blue-50">
            <h5 class="font-medium text-gray-900">Consultation</h5>
            <p class="text-sm text-gray-600">30 min session</p>
          </button>
          <button class="w-full text-left p-4 rounded-lg border-2 border-gray-200 bg-white">
            <h5 class="font-medium text-gray-900">Product Demo</h5>
            <p class="text-sm text-gray-600">45 min session</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Center - Calendar -->
    <div class="flex-1 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <!-- Calendar grid for date selection -->
      </div>
      
      <div class="mt-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button class="p-3 rounded-lg border-2 border-blue-300 bg-blue-50 text-center">
            <div class="font-medium text-sm">1:00 PM</div>
            <div class="text-xs mt-1">60 min</div>
          </button>
        </div>
      </div>
    </div>

    <!-- Right Sidebar - Booking Summary -->
    <div class="w-80 bg-gray-50 border-l border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
      <div class="bg-white rounded-lg p-4 border border-gray-200 mb-6">
        <!-- Booking details -->
      </div>
      <div class="space-y-3">
        <button class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium">Book Meeting</button>
      </div>
    </div>
  </div>
</div>`
                  };

                  return (codeTypes[key] || 'react') === 'react' 
                    ? (reactCodes[componentKey] || `// Component code for ${title}`)
                    : (htmlCodes[componentKey] || `<!-- HTML code for ${title} -->`);
                };

                return getComponentCode(key);
              })()}
            </pre>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        <div style={{marginBottom: '56px'}}>
          {renderComponent('monthView', renderMonthCalendar, 'Month Calendar')}
          {renderComponent('weekView', renderWeekCalendar, 'Week Calendar')}
          {renderComponent('yearView', renderYearCalendar, 'Year Calendar')}
          {renderComponent('dayView', renderDayCalendar, 'Day Calendar')}
          {renderComponent('meetingBooking', renderMeetingBookingCalendar, 'Meeting Booking Calendar')}
        </div>
      </div>
    </div>
  )
}