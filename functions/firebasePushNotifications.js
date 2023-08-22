exports.handler = async function (event, context) {
  var key =
    "AAAAgEy3QBw:APA91bEHp0aJ0OnC4YXfXgxPi2jmefXrqnYPGOpwsOEY27ARkztGycfUEnCs0GDcQ-qAXk5govzPLXUJluAtCwIZ-StTQDT8tGdaFAw7s3cuuy4IFBsCtXtekaYWzv9YzOsyLS6X2mFb"
  var to =
    "exLwpsnkBjWEuUlnjwmwci:APA91bHDRd_HSy5E2B0Lw40TFyyPSEKr9ovA2r5cn5pp9_IiGUb81Tl_cRYrIp2FvcIyFN9EiNjtMWe-WXVjq8ApvA2MBgMPQ0YqGc0zDwLA1ZgDoaSlLcwpgC0EqhY-8TdwwsxXSVzb"

  var notification = {
    title: "Portugal vs. Denmark",
    body: "5 to 1",
    icon: "firebase-logo.png",
    click_action: "http://placehold.it/120x120&text=image4",
  }

  try {
    const response = fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: notification,
        to: to,
      }),
    })

    const responseBody = (await response).json()
    console.log(responseBody)

    return {
      statusCode: 200,
      body: JSON.stringify("working"),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404,
      body: JSON.stringify(err),
    }
  }
}
