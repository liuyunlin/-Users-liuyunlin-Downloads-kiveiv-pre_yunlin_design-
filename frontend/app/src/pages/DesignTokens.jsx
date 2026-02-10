import { useState } from 'react'
import {
  Card, CardHeader, CardContent,
  Navigation
} from '../design-system'
import { colors, typography, spacing, shadows, borders } from '../design-system/tokens'

export function DesignTokens({ onNavigateHome }) {
  const [activeToken, setActiveToken] = useState('colors')
  
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
            <span className="ml-4 text-sm font-medium text-gray-900">设计令牌</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  return (
    <div className="legacy-demo-shell min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <Card className="rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>设计令牌</h2>
              <p className="text-sm text-zinc-600">系统中使用的最小设计单元</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Token Navigation */}
              <Navigation
                items={[
                  { id: 'colors', label: '颜色' },
                  { id: 'typography', label: '字体' },
                  { id: 'spacing', label: '间距' },
                  { id: 'shadows', label: '阴影' },
                  { id: 'borders', label: '边框' },
                ]}
                activeItem={activeToken}
                variant="pills"
                orientation="horizontal"
                onItemClick={(item) => setActiveToken(item.id)}
              />

              {/* Token Display */}
              <div className="mt-8">
                {activeToken === 'colors' && (
                  <div className="space-y-8">
                    {Object.entries(colors).map(([colorName, colorValues]) => {
                      if (typeof colorValues === 'string') {
                        return (
                          <div key={colorName} className="space-y-2">
                            <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
                            <div className="flex items-center gap-4">
                              <div 
                                className="w-20 h-12 rounded-lg border border-zinc-200 shadow-sm"
                                style={{ backgroundColor: colorValues }}
                              />
                              <div className="font-mono text-sm text-zinc-600">{colorValues}</div>
                            </div>
                          </div>
                        )
                      }
                      
                      return (
                        <div key={colorName} className="space-y-2">
                          <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                            {Object.entries(colorValues).map(([shade, value]) => (
                              <div key={shade} className="text-center space-y-1">
                                <div 
                                  className="w-full h-16 rounded-lg border border-zinc-200 shadow-sm"
                                  style={{ backgroundColor: value }}
                                />
                                <div className="text-xs font-medium" style={{ color: '#000311' }}>{shade}</div>
                                <div className="text-xs font-mono text-zinc-500">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {activeToken === 'typography' && (
                  <div className="space-y-8">
                    {/* Font Families */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">字体族</h3>
                      <div className="space-y-3">
                        {Object.entries(typography.fontFamily).map(([name, family]) => (
                          <div key={name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium capitalize">{name}</span>
                              <code className="text-xs text-zinc-500">{family[0]}</code>
                            </div>
                            <div 
                              className="text-2xl"
                              style={{ fontFamily: family.join(', ') }}
                            >
                              The quick brown fox jumps over the lazy dog
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Font Sizes */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">字体大小</h3>
                      <div className="space-y-3">
                        {Object.entries(typography.fontSize).map(([size, [fontSize, { lineHeight }]]) => (
                          <div key={size} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-mono text-zinc-500">{size}</div>
                            <div 
                              style={{ 
                                fontSize: fontSize,
                                lineHeight: lineHeight
                              }}
                            >
                              Design System Typography
                            </div>
                            <div className="ml-auto text-xs font-mono text-zinc-400">
                              {fontSize} / {lineHeight}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Font Weights */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">字重</h3>
                      <div className="space-y-3">
                        {Object.entries(typography.fontWeight).map(([name, weight]) => (
                          <div key={name} className="flex items-center gap-4">
                            <div className="w-24 text-sm font-mono text-zinc-500">{name}</div>
                            <div 
                              className="text-xl"
                              style={{ fontWeight: weight }}
                            >
                              The quick brown fox
                            </div>
                            <div className="ml-auto text-xs font-mono text-zinc-400">{weight}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeToken === 'spacing' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">间距尺度</h3>
                    <div className="space-y-3">
                      {Object.entries(spacing).map(([size, value]) => (
                        <div key={size} className="flex items-center gap-4">
                          <div className="w-12 text-sm font-mono text-zinc-500">{size}</div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="bg-blue-200 h-6"
                              style={{ width: value }}
                            />
                            <span className="text-xs font-mono text-zinc-400">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeToken === 'shadows' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">阴影效果</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(shadows).filter(([key]) => 
                        !key.includes('Shadow') && key !== 'none'
                      ).map(([name, shadow]) => (
                        <div key={name} className="space-y-2">
                          <div className="text-sm font-medium">{name}</div>
                          <div 
                            className="w-full h-20 bg-white rounded-lg border border-zinc-100"
                            style={{ 
                              boxShadow: shadow === 'none' ? 'none' : shadow
                            }}
                          />
                          <div className="text-xs font-mono text-zinc-500 break-all">{shadow}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeToken === 'borders' && (
                  <div className="space-y-8">
                    {/* Border Radius */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">边框圆角</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {Object.entries(borders.borderRadius).map(([name, radius]) => (
                          <div key={name} className="space-y-2 text-center">
                            <div 
                              className="w-16 h-16 bg-zinc-100 border-2 border-zinc-300 mx-auto"
                              style={{ borderRadius: radius }}
                            />
                            <div className="text-sm font-medium">{name}</div>
                            <div className="text-xs font-mono text-zinc-500">{radius}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Border Widths */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">边框宽度</h3>
                      <div className="space-y-3">
                        {Object.entries(borders.borderWidth).map(([name, width]) => (
                          <div key={name} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-mono text-zinc-500">{name}</div>
                            <div 
                              className="w-32 h-8 bg-zinc-50 border-zinc-400"
                              style={{ borderWidth: width, borderStyle: 'solid' }}
                            />
                            <div className="text-xs font-mono text-zinc-400">{width}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}