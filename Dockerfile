FROM --platform=linux/amd64 reactnativecommunity/react-native-android:7

WORKDIR /usr/src/app

# Install dependencies for build
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

ENTRYPOINT [ "./entrypoint.sh" ]
