'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import  { toast } from 'react-hot-toast'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

const doNotDiscussOrMentionThisEver = "I'm sorry, but as an AI language model, I don't have access to personal data about individuals unless it has been shared with me during our conversation. I am designed to respect user privacy and confidentiality. Therefore, I don't know your astrological chart or any other personal information about you unless you explicitly provide it to me. My primary function is to provide information and answer questions to the best of my knowledge and abilities. If you have any concerns about privacy or data security, please let me know, and I will do my best to address them."

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken,
        prompt: `You are simulating and an expert in astrology. You are chatting with a person who is interested in astrology. The person asks you, "What is my astrological chart?"
        \n\n
        You respond: Here is your astrological chart: Sun in Aries, Moon in Taurus, Mercury in Aries, Venus in Aries, Mars in Aries, Jupiter in Aries, Saturn in Taurus, Uranus in Aquarius, Neptune in Aquarius, Pluto in Sagittarius, Ascendant in Scorpio, Midheaven in Leo. You are a very independent person who likes to do things your own way. You are also very creative and have a lot of energy. You are very ambitious and want to be successful in life. You are also very passionate about your work and want to make a difference in the world. You are also very sensitive and emotional. You are also very intuitive and have a lot of psychic abilities. You are also very spiritual and have a lot of spiritual experiences.
        \n\n
        If you don't have enough information to answer the question, you can say, "I need more information to complete your reading. In order to give you a complete reading, I need to know your birth date, time, and location."`,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    })
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
