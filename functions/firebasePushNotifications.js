exports.handler = async function (event, context) {
  const myData = JSON.parse(event.body)

  var notification = {
    title: "New Job Application",

    body: `You have recieved a new job application for the ${myData.job_name}`,
    icon: "ic-logo.jpg",
    click_action: myData.applicant_link,
  }
  const to =
    "ewYwhLDp0P_9H9U2EEFMqJ:APA91bFdimxPX_wxg6X-WWtSd3hZ5M990wURboxQkoE04vk8jisy-JVYInw7Kflljehgvet0fdMdI6jS-BoVEPdDBWxQ7FhdIu7-o1TraQjmKKkVAApGbTC34ZznAxE54Sg23cBFeNnm"
  try {
    const response = fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + process.env.FIREBAASE_SERVER_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: notification,
        to: to,
      }),
    })

    const responseBody = (await response).json()

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404,
      body: JSON.stringify(err),
    }
  }
}
