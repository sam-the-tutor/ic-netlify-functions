## IC-HTTP OUT CALLS

three files that are included

- `sendEmployeeEmail.js` - this facilitates the the sending of email to the employee after they have applied for the job

* `sendEmployerEMail.js` - this sends the employer an email once the uemployee applies for their job
* `sendNotification.js` - this sends a push notification to the employer's phone notifying them of the new application on their posted job

exLwpsnkBjWEuUlnjwmwci:APA91bHDRd_HSy5E2B0Lw40TFyyPSEKr9ovA2r5cn5pp9_IiGUb81Tl_cRYrIp2FvcIyFN9EiNjtMWe-WXVjq8ApvA2MBgMPQ0YqGc0zDwLA1ZgDoaSlLcwpgC0EqhY-8TdwwsxXSVzb

ewYwhLDp0P_9H9U2EEFMqJ:APA91bFdimxPX_wxg6X-WWtSd3hZ5M990wURboxQkoE04vk8jisy-JVYInw7Kflljehgvet0fdMdI6jS-BoVEPdDBWxQ7FhdIu7-o1TraQjmKKkVAApGbTC34ZznAxE54Sg23cBFeNnm

exports.handler = async function (event, context) {
const myData = JSON.parse(event.body)

var notification = {
title: "New Job Application",
body: "You have recieved a new job application for the",
icon: "https://www.kasandbox.org/programming-images/avatars/primosaur-ultimate.png",
click_action: "https://samthetutor.hashnode.dev",
}
const ton =
"ewYwhLDp0P_9H9U2EEFMqJ:APA91bFdimxPX_wxg6X-WWtSd3hZ5M990wURboxQkoE04vk8jisy-JVYInw7Kflljehgvet0fdMdI6jS-BoVEPdDBWxQ7FhdIu7-o1TraQjmKKkVAApGbTC34ZznAxE54Sg23cBFeNnm"
const key =
"AAAAgEy3QBw:APA91bHj5KukuE5qtGeHHBAmmLGE59YgpdU3Wr8J8bOjlGrUvEcSo_mkUiodFNW2J8xYGVNdeAyHuw9SkwfhLB75d5BBHPcv76mBq9gfsRkjDL94nw9qaeuArnoaAo96RZQLGzTGoihP"

try {
const response = fetch("https://fcm.googleapis.com/fcm/send", {
method: "POST",
headers: {
Authorization: "key=" + key,
"Content-Type": "application/json",
},
body: JSON.stringify({
notification: notification,
to: ton,
}),
})

    const responseBody = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    }

} catch (err) {
console.log(err)
return {
statusCode: 404,
body: JSON.stringify(err),
}
}
}
