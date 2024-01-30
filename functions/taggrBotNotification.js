exports.handler = async function (event, context) {

//need to recieve the principal id, media type and media handle 
  const myData = JSON.parse(event.body)

  //construct the data in a format needed by the emailjs to send an email
  var data = {
    service_id: "service_v46belc",
    template_id: "template_83d4t4k",
    user_id: "PRgnEfVQsYJOuZasb",
    template_params: {
      principal_id: myData.principal_id,
      media_account: myData.media_account,
      user_handle: myData.user_handle,
    },
  }

  try {
    //execute the fetch function to the api
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    let responseText = await response.text()
    if (responseText === "OK") {
      return {
        statusCode: 200,
        body: responseText,
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify(responseText),
      }
    }
    //catch any errors and return them to the user
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify(e),
    }
  }
}
