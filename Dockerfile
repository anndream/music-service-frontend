FROM node:12.16.1 as build-stage
WORKDIR /codebase
COPY . /codebase
RUN sh -c 'cat src/services/Api.ts | grep -Po "(?<=defaultURL = ['"'\\\"])[^'\\\"]+\" | head -1 > DEFAULT_BACKEND_API"
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

FROM nginx:stable-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /codebase/dist /usr/share/nginx/html
COPY --from=build-stage /codebase/DEFAULT_BACKEND_API /app
COPY nginx/* /etc/nginx/conf.d/msfe.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
