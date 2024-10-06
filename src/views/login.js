module.exports = (req, res) => {
  res.send(/* HTML */ `
    <!doctype html>

    <html>
      <head>
        <meta charset="utf-8" />
        <title>Pcal</title>
      </head>

      <body>
        <form action="/api/login" method="POST">
          <label>
            Username
            <input type="text" name="username" />
          </label>

          <label>
            Password
            <input type="password" name="password" />
          </label>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
};
