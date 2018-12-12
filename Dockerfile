FROM node:alpine

ARG SPACE_ID
ARG SPACE_API_KEY
ARG GOOGLE_TAGMANAGER_ID

ENV SPACE_ID $SPACE_ID
ENV SPACE_API_KEY $SPACE_API_KEY
ENV GOOGLE_TAGMANAGER_ID $GOOGLE_TAGMANAGER_ID

# Set a working directory
WORKDIR /usr/app

COPY package.json .

# Install Node.js dependencies
RUN yarn install --no-progress

# Copy application files
COPY . .

RUN yarn build --release

EXPOSE 3000

CMD ["yarn", "serve", "--release"]
