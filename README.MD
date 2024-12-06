Commands for installation 

npm init -y
npm install hono
npm install -D typescript @types/node ts-node

bun run start 
check package.json - It must have 
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "bun src/index2.ts",
    "dev": "bun watch src/index2.ts" 
    to run . 

