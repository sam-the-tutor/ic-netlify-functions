// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  var data = {
    service_id: process.env.SERVICE_ID,
    template_id: process.env.EMPLOYEE_TEMPLATE_ID,
    user_id: process.env.USER_ID,
    template_params: {
      job_name: "Software Engineering",
      employee_name: "Paul",
      from_name: "IC JobBoard",
      employee_address: "peacevian66#gmail.com",
      reply_to: "smartskillsweb3@gmail.com",
    },
  }

  try {
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

    return {
      statusCode: response.status,
      body: responseText,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
