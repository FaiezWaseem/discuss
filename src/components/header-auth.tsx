'use client';
import { Button, Avatar, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from '@/actions'



export default function AuthContent() {
    const session = useSession();
    let authContent: React.ReactNode;
    if (session.status === 'loading') {
        authContent = null;
    } else if (session.data?.user) {
        authContent = <Popover placement="bottom" className="cursor-pointer">
            <PopoverTrigger>
                <Avatar src={session.data.user.image || ''}></Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <form action={actions.signOut}>
                        <Button type="submit" >   SignOut</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    } else {
        authContent = <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered" >Signin</Button>
        </form>
    }
    return authContent;
}