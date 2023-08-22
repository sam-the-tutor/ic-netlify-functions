exports.handler = async function (event, context) {
  var key =
    "AAAAgEy3QBw:APA91bHj5KukuE5qtGeHHBAmmLGE59YgpdU3Wr8J8bOjlGrUvEcSo_mkUiodFNW2J8xYGVNdeAyHuw9SkwfhLB75d5BBHPcv76mBq9gfsRkjDL94nw9qaeuArnoaAo96RZQLGzTGoihP"
  var to =
    "ewYwhLDp0P_9H9U2EEFMqJ:APA91bFdimxPX_wxg6X-WWtSd3hZ5M990wURboxQkoE04vk8jisy-JVYInw7Kflljehgvet0fdMdI6jS-BoVEPdDBWxQ7FhdIu7-o1TraQjmKKkVAApGbTC34ZznAxE54Sg23cBFeNnm"

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
