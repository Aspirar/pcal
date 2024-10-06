module.exports = (req, res) => {
  res.send(/* HTML */ `
    <!doctype html>

    <html>
      <head>
        <meta charset="utf-8" />
        <title>Pcal</title>
      </head>

      <body>
        <form action="/api/scheduler/create" method="POST">
          <label>
            Name
            <input type="text" name="name" />
          </label>

          <label>
            Start Date
            <input type="date" name="startTime" />
          </label>

          <label>
            End Date
            <input type="date" name="endTime" />
          </label>

          <label>
            Slot start time
            <input type="time" name="slotStartTime" />
          </label>

          <label>
            Slot end time
            <input type="time" name="slotEndTime" />
          </label>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
};
