import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const accessToken = request.headers.get('authorization')?.split(' ')[1] // Предполагается, что токен передается в формате "Bearer <token>"
  console.log(accessToken)
  // Если токен отсутствует и пользователь пытается получить доступ не к странице логина
  if (!accessToken && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Если токен присутствует и пользователь пытается получить доступ к странице логина
  if (accessToken && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Пример проверки истечения срока действия токена (факультативно)
  // Это может потребовать дополнительного запроса к вашему серверу для проверки токена
  /*
  const isTokenValid = await checkTokenValidity(accessToken);
  if (!isTokenValid) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    if (refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken);
      if (newTokens) {
        // Обновите токены и продолжите запрос
        return NextResponse.next();
      } else {
        // Если обновить токены не удалось, перенаправляем на страницу логина
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } else {
      // Если refreshToken отсутствует, перенаправляем на страницу логина
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  */

  // Если все проверки пройдены, продолжаем запрос
  return NextResponse.next()
}

// Факультативные функции для проверки и обновления токенов
async function checkTokenValidity(token) {
  // Логика проверки токена
  // Например, запрос к серверу для проверки токена
  // return await fetch('/api/check-token', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.ok);
  return true // Временная заглушка
}

async function refreshAccessToken(refreshToken) {
  // Логика обновления токенов
  // Например, запрос к вашему серверу для обновления токенов
  // const response = await fetch('/update-tokens', { method: 'POST', body: JSON.stringify({ refreshToken }) });
  // if (response.ok) {
  //   return await response.json(); // возвращаем новые токены
  // }
  return null // Временная заглушка
}

export const config = {
  matcher: ['/sign-in', 'sign-up'],
}
