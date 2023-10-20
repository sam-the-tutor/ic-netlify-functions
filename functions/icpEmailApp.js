//send a specific email to the user..
exports.handler = async function (event, context) {
  if (!event.body) {
    return {
      statusCode: 200,
      body: "responseText",
    };
  }
  const myData = JSON.parse(event.body);

  const data = {
    service_id: "service_0ktpvva",
    template_id: "template_5ex8f4c",
    user_id: "PRgnEfVQsYJOuZasb",
    template_params: {
      recipient_email: myData.recipientEmail,
      to_name: myData.toName,
    },
  };

  try {
    // //execute the fetch function to the api
    // const response = await fetch(
    //   "https://api.emailjs.com/api/v1.0/email/send",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );
    // let responseText = await response.text();
    // if (responseText === "OK") {
    //   return {
    //     statusCode: 200,
    //     body: responseText,
    //   };
    // } else {
    //   return {
    //     statusCode: 400,
    //     body: JSON.stringify(responseText),
    //   };
    // }

    return {
      statusCode: 200,
      body: responseText,
    };
    //catch any errors and return them to the user
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify(e),
    };
  }
};
