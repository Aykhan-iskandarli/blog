import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';


export function middleware(req:NextRequest){
    const token =req.cookies.get("token");
    const { pathname, origin } = req.nextUrl
    if(req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/user')){
        console.log("sag")
        if (!token) {
            console.log("salam")
            return NextResponse.redirect(`${origin}/login`)
          }
    }
    return NextResponse.next()
}