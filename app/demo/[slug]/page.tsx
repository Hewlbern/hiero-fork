import React from 'react'
import DemoPage from '@/components/demo-page'
import { createClient } from '@/utils/supabase/server'

export default async function AppPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient()
  const { data: app, error } = await supabase
    .from('apps')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !app) {
    console.error('Error fetching app data:', error)
    return <div>Error loading app data</div>
  }

  const appData = {
    name: app.name,
    description: app.description,
    redirectUrl: app.url,
    features: app.features || ['Personalized training', 'Real-time assistance', 'Data analytics', 'Device integration'],
    slug: app.slug,
  }

  return <DemoPage appData={appData} />
}

// ... existing code ...