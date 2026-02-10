import { createContext, useContext, useMemo, useState } from 'react'
import { SETTINGS_PANEL_LIST } from './constants.js'
import { PROFILE_DEFAULTS } from './constants.js'

const SettingsContext = createContext(null)

const createInitialState = () => {
  return SETTINGS_PANEL_LIST.reduce((acc, panel) => {
    const defaultValue = panel.defaultValue || ''
    acc[panel.id] = { draft: defaultValue, saved: defaultValue }
    return acc
  }, {})
}

export function SettingsProvider({ children }) {
  const [models, setModels] = useState(createInitialState)
  const [modelConfigs, setModelConfigs] = useState({})
  const [profileDraft, setProfileDraft] = useState(PROFILE_DEFAULTS)
  const [profileSaved, setProfileSaved] = useState(PROFILE_DEFAULTS)
  const [profileUpdatedAt, setProfileUpdatedAt] = useState('')

  const updateDraft = (panelId, model) => {
    setModels((prev) => ({
      ...prev,
      [panelId]: { ...(prev[panelId] || { draft: '', saved: '' }), draft: model }
    }))
  }

  const saveModel = (panelId) => {
    setModels((prev) => {
      const current = prev[panelId] || { draft: '', saved: '' }
      if (!current?.draft) return prev
      return {
        ...prev,
        [panelId]: { draft: current.draft, saved: current.draft }
      }
    })
  }

  const resetModel = (panelId) => {
    setModels((prev) => ({
      ...prev,
      [panelId]: { draft: '', saved: '' }
    }))
  }

  const initializeModel = (panelId, defaultValue = '') => {
    setModels((prev) => ({
      ...prev,
      [panelId]: { draft: defaultValue, saved: defaultValue }
    }))
  }

  const updateModelConfig = (panelId, config) => {
    setModelConfigs((prev) => ({
      ...prev,
      [panelId]: { ...(prev[panelId] || {}), ...config }
    }))
  }

  const updateProfileDraft = (patch) => {
    setProfileDraft((prev) => ({ ...prev, ...patch }))
  }

  const saveProfile = () => {
    const now = new Date()
    const pad = (value) => String(value).padStart(2, '0')
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
    setProfileSaved(profileDraft)
    setProfileUpdatedAt(timestamp)
  }

  const resetProfileDraft = () => {
    setProfileDraft(profileSaved)
  }

  const value = useMemo(
    () => ({
      models,
      modelConfigs,
      profileDraft,
      profileSaved,
      profileUpdatedAt,
      updateDraft,
      saveModel,
      resetModel,
      initializeModel,
      updateModelConfig,
      updateProfileDraft,
      saveProfile,
      resetProfileDraft
    }),
    [models, modelConfigs, profileDraft, profileSaved, profileUpdatedAt]
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettingsStore() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettingsStore 必须在 SettingsProvider 中使用')
  }
  return context
}
