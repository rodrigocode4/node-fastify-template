FROM public.ecr.aws/docker/library/node:16-alpine AS builder
USER node
WORKDIR /app
COPY --chown=node:node . .
RUN yarn
RUN yarn build

FROM public.ecr.aws/docker/library/node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --production=true
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["yarn", "server"]
