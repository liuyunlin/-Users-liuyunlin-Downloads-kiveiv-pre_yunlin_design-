import { useState } from 'react'
import {
  Card, CardHeader, CardContent,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Badge,
  LegacyPagination,
  SimpleLineChart,
  SimpleAreaChart,
  SimpleBarChart,
  SimplePieChart,
  MultiLineChart,
  ChartContainer
} from '../design-system'

export function DataDisplayComponents({ onNavigateHome, onNavigateToDescriptionLists, onNavigateToStats, onNavigateToCalendars, onNavigateToFormLayouts }) {
  const [currentPage, setCurrentPage] = useState(1)
  
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
            <span className="ml-4 text-sm font-medium text-gray-900">数据展示组件</span>
          </div>
        </li>
      </ol>
    </nav>
  )
  
  const tableData = [
    { id: 1, name: 'Alpha 系统', category: '核心服务', status: 'active', usage: 85 },
    { id: 2, name: 'Beta 组件', category: 'UI库', status: 'inactive', usage: 23 },
    { id: 3, name: 'Gamma 工具', category: '开发工具', status: 'active', usage: 67 },
    { id: 4, name: 'Delta 模块', category: '数据处理', status: 'active', usage: 91 },
  ]

  const lineChartData = [
    { name: 'Jan', value: 400, revenue: 300 },
    { name: 'Feb', value: 300, revenue: 200 },
    { name: 'Mar', value: 600, revenue: 450 },
    { name: 'Apr', value: 800, revenue: 600 },
    { name: 'May', value: 700, revenue: 550 },
    { name: 'Jun', value: 900, revenue: 750 },
  ]

  const barChartData = [
    { name: '产品A', value: 45 },
    { name: '产品B', value: 62 },
    { name: '产品C', value: 38 },
    { name: '产品D', value: 71 },
  ]

  const pieChartData = [
    { name: '桌面端', value: 45, color: '#3b82f6' },
    { name: '移动端', value: 35, color: '#10b981' },
    { name: '平板', value: 20, color: '#f59e0b' },
  ]

  const multiLines = [
    { dataKey: 'value', color: '#3b82f6', name: '访问量' },
    { dataKey: 'revenue', color: '#10b981', name: '收入' }
  ]

  return (
    <div className="legacy-demo-shell min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div className="space-y-9">
          {/* 布局样式组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToFormLayouts}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>布局样式</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 布局样式预览 - Labels on left form layout */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div className="px-4 sm:px-0">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                  </p>
                </div>

                <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                  <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="website-preview" className="block text-sm font-medium leading-6 text-gray-900">
                          Website
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
                            <input
                              type="text"
                              name="website"
                              id="website-preview"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="www.example.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="about-preview" className="block text-sm font-medium leading-6 text-gray-900">
                          About
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about-preview"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue=""
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="photo-preview" className="block text-sm font-medium leading-6 text-gray-900">
                          Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                          <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                          </svg>
                          <button
                            type="button"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* 描述列表组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToDescriptionLists}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>描述列表</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">4个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 描述列表预览 - Narrow with Hidden Labels 样式 */}
              <dl className="space-y-3 text-sm leading-6">
                <div className="flex justify-between items-start">
                  <dt className="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
                    Status
                  </dt>
                  <dd className="text-gray-900 font-semibold text-right">
                    Active
                  </dd>
                </div>
                <div className="flex justify-between items-start">
                  <dt className="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
                    Email
                  </dt>
                  <dd className="text-gray-900 font-semibold text-right">
                    user@example.com
                  </dd>
                </div>
                <div className="flex justify-between items-start">
                  <dt className="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
                    Role
                  </dt>
                  <dd className="text-gray-900 font-semibold text-right">
                    Administrator
                  </dd>
                </div>
                <div className="flex justify-between items-start">
                  <dt className="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
                    Last login
                  </dt>
                  <dd className="text-gray-900 font-semibold text-right">
                    2 hours ago
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* 统计数据组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToStats}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>统计数据</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">5个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 统计数据预览 - 简单统计样式 */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-center lg:grid-cols-3">
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">Total Revenue</dt>
                  <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">$71,897</dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">Total Orders</dt>
                  <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">1,340</dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">Page Views</dt>
                  <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">12,847</dd>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 日历组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToCalendars}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>日历</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">5个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 日历预览 - Month Calendar样式 */}
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
                      <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
                            Design Review
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                            9:00 AM
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                              alt="John Doe"
                              title="John Doe"
                            />
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1494790108755-2616b2913d17?w=32&h=32&fit=crop&crop=faces"
                              alt="Jane Smith"
                              title="Jane Smith"
                            />
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces"
                              alt="Alex Johnson"
                              title="Alex Johnson"
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            1h 30m
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
                            Client Presentation
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                            2:00 PM
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces"
                              alt="Mike Wilson"
                              title="Mike Wilson"
                            />
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces"
                              alt="Sarah Davis"
                              title="Sarah Davis"
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            45m
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-900 text-sm leading-5 group-hover:text-gray-800">
                            Team Standup
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                            10:00 AM
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=faces"
                              alt="Tom Brown"
                              title="Tom Brown"
                            />
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=faces"
                              alt="Lisa Chen"
                              title="Lisa Chen"
                            />
                            <img
                              className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-200"
                              src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=faces"
                              alt="David Park"
                              title="David Park"
                            />
                            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center ring-1 ring-gray-200">
                              <span className="text-xs text-gray-600 font-medium">+1</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            30m
                          </span>
                        </div>
                      </div>
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
                        <div className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Sun</div>
                        <div className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Mon</div>
                        <div className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Tue</div>
                        <div className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Wed</div>
                        <div className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Thu</div>
                        <div className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Fri</div>
                        <div className="p-4 text-center text-sm font-semibold text-gray-700">Sat</div>
                      </div>
                      
                      {/* Calendar Days */}
                      <div className="grid grid-cols-7">
                        {/* First Week */}
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            29
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            30
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            31
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            1
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            2
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            3
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            4
                          </div>
                        </div>
                        
                        {/* Second Week */}
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            5
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            6
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            7
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            8
                          </div>
                          <div className="space-y-1">
                            <div className="relative">
                              <div className="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-blue-500 hover:shadow-sm transition-all cursor-pointer">
                                <div className="truncate">Design Review</div>
                              </div>
                              <div className="flex -space-x-1 mt-1">
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            9
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            10
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            11
                          </div>
                        </div>
                        
                        {/* Third Week */}
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            12
                          </div>
                          <div className="space-y-1">
                            <div className="relative">
                              <div className="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-green-500 hover:shadow-sm transition-all cursor-pointer">
                                <div className="truncate">Client Call</div>
                              </div>
                              <div className="flex -space-x-1 mt-1">
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            13
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            14
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">
                            15
                          </div>
                          <div className="space-y-1">
                            <div className="relative">
                              <div className="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-purple-500 hover:shadow-sm transition-all cursor-pointer">
                                <div className="truncate">Team Standup</div>
                              </div>
                              <div className="flex -space-x-1 mt-1">
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-600 font-medium">+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            16
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            17
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            18
                          </div>
                          <div className="space-y-1">
                            <div className="relative">
                              <div className="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-orange-500 hover:shadow-sm transition-all cursor-pointer">
                                <div className="truncate">Project Review</div>
                              </div>
                              <div className="flex -space-x-1 mt-1">
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-600 font-medium">+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Fourth Week */}
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            19
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            20
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            21
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            22
                          </div>
                          <div className="space-y-1">
                            <div className="relative">
                              <div className="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-pink-500 hover:shadow-sm transition-all cursor-pointer">
                                <div className="truncate">Planning</div>
                              </div>
                              <div className="flex -space-x-1 mt-1">
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            23
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            24
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            25
                          </div>
                          <div className="space-y-1">
                            <div className="relative">
                              <div className="text-xs px-2 py-1 rounded-md truncate text-white font-medium bg-indigo-500 hover:shadow-sm transition-all cursor-pointer">
                                <div className="truncate">Demo Day</div>
                              </div>
                              <div className="flex -space-x-1 mt-1">
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-300 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gray-100 border border-white ring-1 ring-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-600 font-medium">+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Fifth Week */}
                        <div className="p-3 min-h-[120px] border-r border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            26
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            27
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            28
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            29
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-white text-gray-900">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            30
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] border-r border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            1
                          </div>
                        </div>
                        <div className="p-3 min-h-[120px] hover:bg-gray-50/50 transition-colors cursor-pointer relative bg-gray-50/30 text-gray-400">
                          <div className="text-sm font-semibold mb-2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100">
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 数据表格 */}
          <Card className="rounded-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>数据表格</h2>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>使用率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>
                        <Badge color={row.status === 'active' ? 'green' : 'zinc'}>
                          {row.status === 'active' ? '启用' : '禁用'}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.usage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 分页组件 */}
          <Card className="rounded-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>分页组件</h2>
            </CardHeader>
            <CardContent>
              <LegacyPagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                maxPageNumbers={5}
              />
            </CardContent>
          </Card>

          {/* 图表组件 */}
          <Card className="rounded-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>图表组件</h2>
              <p className="text-sm text-zinc-600">使用 Recharts 构建的现代化图表组件</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartContainer 
                    title="线形图" 
                    description="展示趋势变化"
                  >
                    <SimpleLineChart data={lineChartData} height={250} />
                  </ChartContainer>

                  <ChartContainer 
                    title="面积图" 
                    description="填充区域显示数据"
                  >
                    <SimpleAreaChart data={lineChartData} height={250} />
                  </ChartContainer>

                  <ChartContainer 
                    title="柱状图" 
                    description="对比不同类别数据"
                  >
                    <SimpleBarChart data={barChartData} height={250} />
                  </ChartContainer>

                  <ChartContainer 
                    title="饼图" 
                    description="展示数据占比"
                  >
                    <SimplePieChart data={pieChartData} height={250} />
                  </ChartContainer>
                </div>

                <ChartContainer 
                  title="多线图表" 
                  description="对比多个数据序列"
                >
                  <MultiLineChart 
                    data={lineChartData} 
                    lines={multiLines} 
                    height={300} 
                  />
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}