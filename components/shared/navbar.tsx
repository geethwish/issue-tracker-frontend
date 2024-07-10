"use client"
import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const [name, setName] = useState("")
    const router = useRouter()
    const handleLogout = () => {
        localStorage.clear()
        router.push('/login')

    }

    function getFirstCharacters(strings: string[]): string[] {
        return strings.map(string => string.charAt(0));
    }


    const getOnlyFirstCharacter = () => {

        if (user !== undefined && user !== null) {

            const characters = getFirstCharacters(user.name.split(' ')).join("");
            setName(characters)
            return characters
        } else {
            setName("GU")
            return "GU"
        }

    }

    useEffect(() => {
        getOnlyFirstCharacter()
    }, [user])

    return (
        <div className="flex items-center justify-end h-16 bg-white border-b border-gray-200">
            <div className="flex items-end pr-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar