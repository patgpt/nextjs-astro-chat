import { UseChatHelpers } from 'ai/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Astrological Chart',
    message: `What is my astrological chart?`
  },
   
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to AstroChat
        </h1>
        <div className='flex w-full flex-row items-center justify-between'>
          <Image src='/ava.jpeg' width={100} height={100} alt={'Woman in the Cosmos'}  />
          <p className="mb-2 ml-4 text-lg leading-normal text-muted-foreground">
          This is an open source Astrology Chatbot app built by{' '}
          <ExternalLink href="https://x.com/PatGPT4">Patrick Kelly
          </ExternalLink>
          </p>
        </div>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
