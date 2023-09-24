exports.handler = async function (event, context) {
  //Needs to recieve the job_name,employee_name and to_name from the canister in the event..
  const myData = JSON.parse(event.body)

  //construct the data in a format needed by the emailjs to send an email
  const formattedAmount = Number(myData.amount) / 10 ** 8
  var data = {
    service_id: process.env.SERVICE_ID,
    template_id: process.env.EMPLOYEE_TEMPLATE_ID,
    user_id: process.env.USER_ID,
    template_params: {
      token_name: myData.token,
      to_email: myData.email,
      token_amount: formattedAmount,
      payer: myData.payer,
      account_address: myData.owner,
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
