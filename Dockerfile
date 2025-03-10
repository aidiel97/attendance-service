# Menggunakan image dasar Node.js
FROM node:16

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependencies
RUN npm install

# Menyalin seluruh proyek ke dalam container
COPY . .

# Menjalankan aplikasi
RUN npm run build
CMD ["npm", "start"]

# Membuka port yang digunakan aplikasi
EXPOSE 3000
