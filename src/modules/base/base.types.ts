import { FastifyInstance, RouteShorthandOptions, DoneFuncWithErrOrRes, FastifyError, FastifyRequest, FastifyReply } from 'fastify'
 
export type Opts = RouteShorthandOptions
export type App = FastifyInstance
export type Done = DoneFuncWithErrOrRes
export type Error = FastifyError
export type Req = FastifyRequest
export type Reply = FastifyReply 
export type Handle = (request: Req, reply: Reply ) => Promise<FastifyReply>
