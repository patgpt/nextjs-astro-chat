 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Logo() {
  return (
    <Avatar className="mr-4">
      <AvatarImage src="logo.png" alt="@shadcn" />
    </Avatar>
  )
}
