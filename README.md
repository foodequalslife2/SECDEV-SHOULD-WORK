<p align = "center">
<img src = "https://github.com/DLSU-CCAPDEV/2021T2-G42/blob/Phase-3/dist/images/logo.png" width = "300">
</p>

<div align = "center">
  <h1> Music For Inspiring Creators </h1>
</div>

This site is a website for musical artists, who would want to showcase their musical talent or others, the site also offers tools that could help practicioners from a metronome, to tabs for famous songs.

<h2> Running the project </h2>

## Running locally

1. Download the repository by either github or using:
```
git clone https://github.com/DLSU-CCAPDEV/2021T2-G42
```
2. In the project directory, use the following command:
```
npm install
```
3. Afterwards, use the following commands to create the database:
```
node add_userdata.js
```
```
node add_postdata.js
```
```
node add_commentdata.js
```
```
node add_tabsdata.js
```
4. Press Ctrl + C to continue typing commands
5. Run the server with:
```
node app.js
```

## Database Schema

<img src = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/blob/milestone1/schema.png">

## User Credentials

Regular User:
```
Username: iceice
Password: testpass
```

Admin:
```
Username: admin
Password: admin1234
```

## Admin Page

To view the Admin Page, redirect in your search bar 
```
localhost:3000/adminpanel
```

### The project structured as such: 

| Folder | Description |
| --- | --- |
| <a href = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/tree/milestone1/controllers"><code>controllers</code></a> | Contains the JavaScript files that define callback functions for client-side requests |
| <a href = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/tree/milestone1/dist"><code>dist</code></a> | Contains the static CSS and JavaScript files, as well as the project assets (images and audio files), for front-end display |
| <a href = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/tree/milestone1/helpers"><code>helpers</code> | Contains the JavaScript files that define helper functions for front-end display and server-side validation | 
| <a href = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/tree/milestone1/misc"><code>misc</code></a> | Contains the JavaScript files for initial database population |
| <a href = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/tree/milestone1/models"><code>models</code></a> | Contains the JavaScript files for database modeling and access | 
| <a href = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/tree/milestone1/routes"><code>routes</code></a> | Contains the JavaScript file that defines the server response to each HTTP method request |
| <a href = "https://github.com/foodequalslife2/SECDEV-WITH-FRAN/tree/milestone1/views"><code>views</code></a> | Contains the Handlebars template files to be rendered and displayed upon request |
