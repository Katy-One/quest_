import { Socket } from 'socket.io'
import { verifyJwt } from '../utils/jwt'

interface JwtPayload {
  sub: string
}
export interface CustomSocket extends Socket {
  user?: JwtPayload
}
export const isTokenPayload = (payload: any): payload is { sub: string } => {
  return typeof payload.sub === 'string'
}

export const socketAuthMiddleware = (
  socket: CustomSocket,
  next: (err?: Error) => void,
) => {
  const token = socket.handshake.auth.token

  if (!token) {
    return next(new Error('Authentication error: Missing token'))
  }

  try {
    const decoded = verifyJwt(token.split(' ')[1], 'accessTokenPublicKey')
    if (isTokenPayload(decoded)) {
      socket.user = decoded
      next()
    }
  } catch (err) {
    next(new Error('Authentication error: Invalid token'))
  }
}
