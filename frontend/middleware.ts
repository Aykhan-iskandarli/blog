import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';


export function middleware(req:NextRequest){
    const token =req.cookies.get("token");
    const { pathname, origin } = req.nextUrl

    if(req.nextUrl.pathname.startsWith('/login')){
        if (token) {
            return NextResponse.redirect(`${origin}`)
          }
    }
    else if(req.nextUrl.pathname.startsWith(`${origin}`)){
      if (!token) {
        return NextResponse.redirect(`${origin}/login`)
      }
      else{
        return NextResponse.next()
      }
    }

    return NextResponse.next()
}