# Use the Node.js Alpine image as the base image
FROM node:alpine

# Set the working directory inside the container to /app
WORKDIR '/app'

# Copy the package.json file from the host to the current working directory inside the container
COPY package.json .

# Copy all files from the current directory on the host to the working directory in the container
COPY . .

# Run npm install inside the container to install the dependencies listed in package.json
RUN npm install


# Specify the default command to run when the container starts
CMD [ "npm" ,"run", "vite" ]