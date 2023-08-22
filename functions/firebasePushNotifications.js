exports.handler = async function (event, context) {
  const myData = JSON.parse(event.body)

  var key = process.env.FIREBASE_SERVER_KEY

  var notification = {
    title: `New ${myData.job_name} Application`,
    body: "Your job post has one more person interested.",
    icon: "firebase-logo.png",
    click_action: myData.applicant_link,
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
        to: myData.phone_code,
      }),
    })
    const responseText = (await response).text()

    return {
      statusCode: 200,
      body: JSON.stringify(responseText),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404,
      body: JSON.stringify(err),
    }
  }
}
