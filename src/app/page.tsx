import { Button } from "@nextui-org/react"

import { auth } from '@/auth'

import * as actions from '@/actions'

export default async function Home() {

  const session = await auth();
  if(session){
    return <div className="container m-auto flex gap-3">
      <p>
         {session.user?.name}

      </p>
      <h1>
         {session.user?.email}

      </h1>
      <form action={actions.signOut}>
      <Button type="submit" variant={'bordered'} >signOut</Button>
    </form>
    </div>
  }

  return <div className="container m-auto flex gap-3">
    <form action={actions.signIn}>
      <Button type="submit" >signIn</Button>
    </form>
   
  </div>
}