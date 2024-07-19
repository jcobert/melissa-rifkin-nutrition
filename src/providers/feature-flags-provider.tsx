'use client'

import { ReactNode, createContext, useContext } from 'react'
import { FeatureFlag, FeatureFlagKey } from 'sanity-studio/types'

export type FeatureFlagsContextType = FeatureFlagKey[] | undefined

export const FeatureFlagsContext =
  createContext<FeatureFlagsContextType>(undefined)

export const FeatureProvider = ({
  features = [],
  children,
}: {
  features: FeatureFlagsContextType
  children: ReactNode
}) => {
  return (
    <FeatureFlagsContext.Provider value={features}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export const useFeatureFlag = (name: FeatureFlagKey) => {
  const features = useContext(FeatureFlagsContext)
  return features?.includes(name)
}

export const createProviderFlags = (flags: FeatureFlag[]) => {
  const filtered = flags
    .filter((feature) => feature?.status === true)
    .map((feature) => feature?.key)
  return filtered || []
}
