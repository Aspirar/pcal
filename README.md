# pcal

## Functionality

### Create a scheduler
A scheduler encapsulates user preferences to define when they are available for meetings. The following is supported:
- Setting a date range for the scheduler to be enabled
- Duration of the meeting can be specified
- Time zone of the user can be specified
- A stride can be specified, which is used to calculate the starting increments for the slots.
- A notice can be specified, which will ensure meetings can be scheduled only with sufficient notice.
- A start and end buffer can be specified, to add some buffer times before and after scheduled meetings.
- Multiple time ranges can be specified for the times the user is available during the day.

### Get Slots
Slots can be queried for a particular day for a specified scheduler
- Slots are calculated based on the specified times in the scheduler
- Slots take into account the stride
- Slots are not shown if the owner already has a meeting scheduled which is conflicting
- The conflicting meeting calculation takes into account notice and buffer times
- Overlap detection is added, so that an overlap indicator can be added to the slots where the querying user has a conflicting meeting.

### Create meeting
Meetings can be created taking into account of the following:
- Conflicting meetings will fail to be booked.
- Conflicts take into account buffer times
- Meetings without sufficient notice will fail
- Meetings have to be booked with a valid slot

## Future enhancements
- When creating a scheduler, a sliding window for the next few days can be added as an option in addition to a date range. Specifying an indefinite period can also be supported.
- Getting slots can be supported for more than a day to support showing available days on the UI. This can be done in a limited way in which the information in the scheduler can be used to filter out days where no slots have been defined, but this would not filter out days where all slots have been booked. Some performance enhancements will be required otherwise this might be slow for users with a lot of meetings.
- Transactions and concurrency control can be added, I have skipped that for now, so there will be race conditions.
- Integrations are an important feature. Users will already be using a calendar app, and they will have meetings which are not scheduled on pcal. These calendars can be integrated so that these events can be taken into account.
- Email notifications can be sent at approprite times for reminders. Emails can also be sent when the meeting is created, with the invite.
- Time ranges in the scheduler for a day can be merged with the next day if they are continuous or overlapping. Then the slots can be deduplicated to properly support slots and meetings which spill over to the next day.
- Analytics can be added to see how users are using the app. They can also be added for the benefit of the users, where they can track popular times etc.
- Reschedule functionality can be added, as of now there is only create and delete.
- More fields can be added to the meeting, for example, integrations with zoom, where and how the meeting is happening (phone, video call, in person), additional custom info to be collected.
- Integration with downstream tools - when a meeting is booked, add it to a calendar, or a custom tool based on the use case (HR, sales)

## How to run
- Clone the repository
- Run mongodb on port 27017 `docker container run --name mongo -p 27017:27017 -d mongo`
- Install dependencies `npm install`
- Run the app `npm start`
