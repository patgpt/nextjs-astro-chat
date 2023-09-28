import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'
import Link from 'next/link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      
     AstroBot Open source AI chatbot built by <ExternalLink href="https://twitter.com/patgpt4">PatGPT4</ExternalLink> with{' '}
       <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
      <ExternalLink href="https://vercel.com/storage/kv">
        Vercel KV
      </ExternalLink>
      .
    </p>
  )
}
