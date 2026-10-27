import { requireAdmin } from '@/lib/requireAdmin'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody

  const jsonResponse = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => {
  await requireAdmin()
  return {
    allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
  }
},
    onUploadCompleted: async () => {
      // no-op, nothing needed here for now
    },
  })

  return NextResponse.json(jsonResponse)
}