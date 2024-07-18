import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    // if (typeof window !== 'undefined') {
        
    //     const data = localStorage.getItem('UserData')
    //   }
//   return NextResponse.redirect(new URL('/thankyou', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/loginpage',
}